namespace main{
    export class Mob extends Character{
        spawningX: any;
        spawningY: any;
        armorLevel: any;
        weaponLevel: any;
        hatelist: any[];
        respawnTimeout: any;
        returnTimeout: any;
        isDead: boolean;
        area: any;
        respawn_callback: any;
        move_callback: any;
        constructor(id, kind, x, y) {
            super(id, "mob", kind, x, y);
            
            this.updateHitPoints();
            this.spawningX = x;
            this.spawningY = y;
            this.armorLevel = Properties.getArmorLevel(this.kind);
            this.weaponLevel = Properties.getWeaponLevel(this.kind);
            this.hatelist = [];
            this.respawnTimeout = null;
            this.returnTimeout = null;
            this.isDead = false;
        }
        
        destroy () {
            this.isDead = true;
            this.hatelist = [];
            this.clearTarget();
            this.updateHitPoints();
            this.resetPosition();
            
            this.handleRespawn();
        }
        
        receiveDamage (points, playerId) {
            this.hitPoints -= points;
        }
        
        hates (playerId) {
            return _.any(this.hatelist, function(obj) { 
                return obj.id === playerId; 
            });
        }
        
        increaseHateFor (playerId, points) {
            if(this.hates(playerId)) {
                _.detect(this.hatelist, function(obj) {
                    return obj.id === playerId;
                }).hate += points;
            }
            else {
                this.hatelist.push({ id: playerId, hate: points });
            }
    
            /*
            log.debug("Hatelist : "+this.id);
            _.each(this.hatelist, function(obj) {
                log.debug(obj.id + " -> " + obj.hate);
            });*/
            
            if(this.returnTimeout) {
                // Prevent the mob from returning to its spawning position
                // since it has aggroed a new player
                clearTimeout(this.returnTimeout);
                this.returnTimeout = null;
            }
        }
        
        getHatedPlayerId (hateRank) {
            var i, playerId,
                sorted = _.sortBy(this.hatelist, function(obj) { return obj.hate; }),
                size = _.size(this.hatelist);
            
            if(hateRank && hateRank <= size) {
                i = size - hateRank;
            }
            else {
                i = size - 1;
            }
            if(sorted && sorted[i]) {
                playerId = sorted[i].id;
            }
            
            return playerId;
        }
        
        forgetPlayer (playerId, duration) {
            this.hatelist = _.reject(this.hatelist, function(obj) { return obj.id === playerId; });
            
            if(this.hatelist.length === 0) {
                this.returnToSpawningPosition(duration);
            }
        }
        
        forgetEveryone () {
            this.hatelist = [];
            this.returnToSpawningPosition(1);
        }
        
        drop (item) {
            if(item) {
                return new Messages.Drop(this, item);
            }
        }
        
        handleRespawn () {
            var delay = 30000,
                self = this;
    
            if(this.area && this.area instanceof MobArea) {
                // Respawn inside the area if part of a MobArea
                this.area.respawnMob(this, delay);
            }
            else {
                if(this.area && this.area instanceof ChestArea) {
                    this.area.removeFromArea(this);
                }
                
                setTimeout(function() {
                    if(self.respawn_callback) {
                        self.respawn_callback();
                    }
                } , delay);
            }
        }
        
        onRespawn (callback) {
            this.respawn_callback = callback;
        }
        
        resetPosition () {
            this.setPosition(this.spawningX, this.spawningY);
        }
        
        returnToSpawningPosition (waitDuration) {
            var self = this,
                delay = waitDuration || 4000;
            
            this.clearTarget();
            
            this.returnTimeout = setTimeout(function() {
                self.resetPosition();
                self.move(self.x, self.y);
            } , delay);
        }
        
        onMove (callback) {
            this.move_callback = callback;
        }
        
        move (x, y) {
            this.setPosition(x, y);
            if(this.move_callback) {
                this.move_callback(this);
            }
        }
        
        updateHitPoints () {
            this.resetHitPoints(Properties.getHitPoints(this.kind));
        }
        
        distanceToSpawningPoint (x, y) {
            return Utils.distanceTo(x, y, this.spawningX, this.spawningY);
        }
    }
    
}