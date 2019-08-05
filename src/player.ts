namespace server{
    export class Player extends Character{
        group:string
        server: WorldServer;
        connection: Connection;
        hasEnteredGame: boolean;
        isDead: boolean;
        haters: {};
        lastCheckpoint: any;
        formatChecker: any;
        disconnectTimeout: any;
        name: any;
        zone_callback(): any {
            throw new Error("Method not implemented.");
        }
        move_callback: any;
        lootmove_callback: any;
        weaponLevel(weaponLevel: any, armorLevel: any): any {
            throw new Error("Method not implemented.");
        }
        armorLevel(weaponLevel: any, armorLevel: any): any {
            throw new Error("Method not implemented.");
        }
        firepotionTimeout: any;
        armor(armor: any): any {
            throw new Error("Method not implemented.");
        }
        message_callback: any;
        exit_callback: any;
        weapon: any;
        broadcast_callback: any;
        broadcastzone_callback: any;
        orient_callback: any;
        requestpos_callback: any;
        
        /**
         * 
         * @param connection 与玩家的连接
         * @param worldServer 玩家所在的世界服务器
         */
        constructor (connection:Connection, worldServer:WorldServer) {
            super(connection.id, "player", Types.Entities.WARRIOR, 0, 0);
            var self = this;
            
            this.server = worldServer;
            this.connection = connection;
    
            
    
            this.hasEnteredGame = false;
            this.isDead = false;
            this.haters = {};
            this.lastCheckpoint = null;
            this.formatChecker = new FormatChecker();
            this.disconnectTimeout = null;
            
            this.connection.listen(function(message) {
    
                var action = parseInt(message[0]);
                
                console.log("收到客户端消息: " + message);
                if(!check(message)) {
                    self.connection.close("无效 "+Types.getMessageTypeAsString(action)+" message format: "+message);
                    return;
                }
                
                // HELLO 必须是是第一条信息
                if(!self.hasEnteredGame && action !== Types.Messages.HELLO) { 
                    self.connection.close("无效的握手消息: "+message);
                    return;
                }

                // HELLO 只能发送一次
                if(self.hasEnteredGame && !self.isDead && action === Types.Messages.HELLO) { 
                    self.connection.close("无法启动两次握手: "+message);
                    return;
                }
                
                self.resetTimeout();
                
                if(action === Types.Messages.HELLO) {
                    var name = Utils.sanitize(message[1]);
                    
                    // If name was cleared by the sanitizer, give a default name.
                    // Always ensure that the name is not longer than a maximum length.
                    // (also enforced by the maxlength attribute of the name input element).
                    self.name = (name === "") ? "lorem ipsum" : name.substr(0, 15);
                    
                    self.kind = Types.Entities.WARRIOR;
                    self.equipArmor(message[2]);
                    self.equipWeapon(message[3]);
                    self.orientation = Utils.randomOrientation();
                    self.updateHitPoints();
                    self.updatePosition();
                    
                    self.server.addPlayer(self);
                    self.server.enter_callback(self);
    
                    self.send([Types.Messages.WELCOME, self.id, self.name, self.x, self.y, self.hitPoints]);
                    self.hasEnteredGame = true;
                    self.isDead = false;
                }
                else if(action === Types.Messages.WHO) {
                    message.shift();
                    self.server.pushSpawnsToPlayer(self, message);
                }
                else if(action === Types.Messages.ZONE) {
                    self.zone_callback();
                }
                else if(action === Types.Messages.CHAT) {
                    var msg = Utils.sanitize(message[1]);
                    
                    // Sanitized messages may become empty. No need to broadcast empty chat messages.
                    if(msg && msg !== "") {
                        msg = msg.substr(0, 60); // Enforce maxlength of chat input
                        self.broadcastToZone(new Messages.Chat(self, msg), false);
                    }
                }
                else if(action === Types.Messages.MOVE) {
                    if(self.move_callback) {
                        var x = message[1],
                            y = message[2];
                        
                        if(self.server.isValidPosition(x, y)) {
                            self.setPosition(x, y);
                            self.clearTarget();
                            
                            self.broadcast(new Messages.Move(self));
                            self.move_callback(self.x, self.y);
                        }
                    }
                }
                else if(action === Types.Messages.LOOTMOVE) {
                    if(self.lootmove_callback) {
                        self.setPosition(message[1], message[2]);
                        
                        var item = self.server.getEntityById(message[3]);
                        if(item) {
                            self.clearTarget();
    
                            self.broadcast(new Messages.LootMove(self, item));
                            self.lootmove_callback(self.x, self.y);
                        }
                    }
                }
                else if(action === Types.Messages.AGGRO) {
                    if(self.move_callback) {
                        self.server.handleMobHate(message[1], self.id, 5);
                    }
                }
                else if(action === Types.Messages.ATTACK) {
                    var mob = self.server.getEntityById(message[1]);
                    
                    if(mob) {
                        self.setTarget(mob);
                        self.server.broadcastAttacker(self);
                    }
                }
                else if(action === Types.Messages.HIT) {
                    var mob = self.server.getEntityById(message[1]);
    
                    if(mob) {
                        var dmg = Formulas.dmg(self.weaponLevel, mob.armorLevel);
                        
                        if(dmg > 0) {
                            mob.receiveDamage(dmg, self.id);
                            self.server.handleMobHate(mob.id, self.id, dmg);
                            self.server.handleHurtEntity(mob, self, dmg);
                        }
                    }
                }
                else if(action === Types.Messages.HURT) {
                    var mob = self.server.getEntityById(message[1]);
                    if(mob && self.hitPoints > 0) {
                        self.hitPoints -= Formulas.dmg(mob.weaponLevel, self.armorLevel);
                        self.server.handleHurtEntity(self, mob);
                        
                        if(self.hitPoints <= 0) {
                            self.isDead = true;
                            if(self.firepotionTimeout) {
                                clearTimeout(self.firepotionTimeout);
                            }
                        }
                    }
                }
                else if(action === Types.Messages.LOOT) {
                    var item = self.server.getEntityById(message[1]);
                    
                    if(item) {
                        var kind = item.kind;
                        
                        if(Types.isItem(kind)) {
                            self.broadcast(item.despawn());
                            self.server.removeEntity(item);
                            
                            if(kind === Types.Entities.FIREPOTION) {
                                self.updateHitPoints();
                                self.broadcast(self.equip(Types.Entities.FIREFOX));
                                self.firepotionTimeout = setTimeout(function() {
                                    self.broadcast(self.equip(self.armor)); // return to normal after 15 sec
                                    self.firepotionTimeout = null;
                                } , 15000);
                                self.send(new Messages.HitPoints(self.maxHitPoints).serialize());
                            } else if(Types.isHealingItem(kind)) {
                                var amount;
                                
                                switch(kind) {
                                    case Types.Entities.FLASK: 
                                        amount = 40;
                                        break;
                                    case Types.Entities.BURGER: 
                                        amount = 100;
                                        break;
                                }
                                
                                if(!self.hasFullHealth()) {
                                    self.regenHealthBy(amount);
                                    self.server.pushToPlayer(self, self.health());
                                }
                            } else if(Types.isArmor(kind) || Types.isWeapon(kind)) {
                                self.equipItem(item);
                                self.broadcast(self.equip(kind));
                            }
                        }
                    }
                }
                else if(action === Types.Messages.TELEPORT) {
                    var x = message[1],
                        y = message[2];
                    
                    if(self.server.isValidPosition(x, y)) {
                        self.setPosition(x, y);
                        self.clearTarget();
                        
                        self.broadcast(new Messages.Teleport(self));
                        
                        self.server.handlePlayerVanish(self);
                        self.server.pushRelevantEntityListTo(self);
                    }
                }
                else if(action === Types.Messages.OPEN) {
                    var chest = self.server.getEntityById(message[1]);
                    if(chest && chest instanceof Chest) {
                        self.server.handleOpenedChest(chest, self);
                    }
                }
                else if(action === Types.Messages.CHECK) {
                    var checkpoint = self.server.map.getCheckpoint(message[1]);
                    if(checkpoint) {
                        self.lastCheckpoint = checkpoint;
                    }
                }
                else {
                    if(self.message_callback) {
                        self.message_callback(message);
                    }
                }
            });
            
            this.connection.onClose(function() {
                if(self.firepotionTimeout) {
                    clearTimeout(self.firepotionTimeout);
                }
                clearTimeout(self.disconnectTimeout);
                if(self.exit_callback) {
                    self.exit_callback();
                }
            });
            
            this.connection.sendUTF8("go"); // Notify client that the HELLO/WELCOME handshake can start
        }
        
        destroy () {
            var self = this;
            
            this.forEachAttacker(function(mob) {
                mob.clearTarget();
            });
            this.attackers = {};
            
            this.forEachHater(function(mob) {
                mob.forgetPlayer(self.id);
            });
            this.haters = {};
        }
        
        getState () {
            var basestate = this._getBaseState(),
                state = [this.name, this.orientation, this.armor, this.weapon];
    
            if(this.target) {
                state.push(this.target);
            }
            
            return basestate.concat(state);
        }
        
        send (message) {
            this.connection.send(message);
        }
        /** 广播 */
        broadcast (message, ignoreSelf?) {
            if(this.broadcast_callback) {
                this.broadcast_callback(message, ignoreSelf === undefined ? true : ignoreSelf);
            }
        }
        
        broadcastToZone (message, ignoreSelf) {
            if(this.broadcastzone_callback) {
                this.broadcastzone_callback(message, ignoreSelf === undefined ? true : ignoreSelf);
            }
        }
        
        onExit (callback) {
            this.exit_callback = callback;
        }
        
        onMove (callback) {
            this.move_callback = callback;
        }
        
        onLootMove (callback) {
            this.lootmove_callback = callback;
        }
        
        onZone (callback) {
            this.zone_callback = callback;
        }
        
        onOrient (callback) {
            this.orient_callback = callback;
        }
        
        onMessage (callback) {
            this.message_callback = callback;
        }
        /** 监听广播 */
        onBroadcast (callback) {
            this.broadcast_callback = callback;
        }
        
        onBroadcastToZone (callback) {
            this.broadcastzone_callback = callback;
        }
        
        equip (item) {
            return new Messages.EquipItem(this, item);
        }
        
        addHater (mob) {
            if(mob) {
                if(!(mob.id in this.haters)) {
                    this.haters[mob.id] = mob;
                }
            }
        }
        
        removeHater (mob) {
            if(mob && mob.id in this.haters) {
                delete this.haters[mob.id];
            }
        }
        
        forEachHater (callback) {
            _.each(this.haters, function(mob) {
                callback(mob);
            });
        }
        
        equipArmor (kind) {
            this.armor = kind;
            this.armorLevel = Properties.getArmorLevel(kind);
        }
        
        equipWeapon (kind) {
            this.weapon = kind;
            this.weaponLevel = Properties.getWeaponLevel(kind);
        }
        
        equipItem (item) {
            if(item) {
                console.log(this.name + " equips " + Types.getKindAsString(item.kind));
                
                if(Types.isArmor(item.kind)) {
                    this.equipArmor(item.kind);
                    this.updateHitPoints();
                    this.send(new Messages.HitPoints(this.maxHitPoints).serialize());
                } else if(Types.isWeapon(item.kind)) {
                    this.equipWeapon(item.kind);
                }
            }
        }
        
        updateHitPoints () {
            this.resetHitPoints(Formulas.hp(this.armorLevel));
        }
        
        updatePosition () {
            if(this.requestpos_callback) {
                var pos = this.requestpos_callback();
                this.setPosition(pos.x, pos.y);
            }
        }
        
        onRequestPosition (callback) {
            this.requestpos_callback = callback;
        }

        /** 
         * 重置超时 
         */
        resetTimeout () {
            clearTimeout(this.disconnectTimeout);
            this.disconnectTimeout = setTimeout(this.timeout.bind(this), 1000 * 60 * 15); // 15 min.
        }
        /** 
         * 客户端15分钟都没动了,超时 
         */
        timeout () {
            //发送 timeout 字段
            this.connection.sendUTF8("timeout")
            //关闭与玩家的连接
            this.connection.close("玩家闲置了15分钟");
        }
    }
}