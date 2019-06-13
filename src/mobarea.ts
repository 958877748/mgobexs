namespace main{
    export class MobArea extends Area{
        nb: number;
        kind: any;
        respawns: any[];
        isDead: boolean;
        
        constructor(id: any, nb: any, kind: any, x: any, y: any, width: any, height: any, world: any) {
            super(id, x, y, width, height, world);
            this.nb = nb;
            this.kind = kind;
            this.respawns = [];
            this.setNumberOfEntities(this.nb);
            
            //this.initRoaming();
        }
        
        spawnMobs() {
            for(var i = 0; i < this.nb; i += 1) {
                this.addToArea(this._createMobInsideArea());
            }
        }
        
        _createMobInsideArea() {
            var k = Types.getKindFromString(this.kind),
                pos = this._getRandomPositionInsideArea(),
                mob = new Mob('1' + this.id + ''+ k + ''+ this.entities.length, k, pos.x, pos.y);
            
            mob.onMove(this.world.onMobMoveCallback.bind(this.world));

            return mob;
        }
        
        respawnMob(mob: Mob, delay: number) {
            var self = this;
            
            this.removeFromArea(mob);
            
            setTimeout(function() {
                var pos = self._getRandomPositionInsideArea();
                
                mob.x = pos.x;
                mob.y = pos.y;
                mob.isDead = false;
                self.addToArea(mob);
                self.world.addMob(mob);
            }, delay);
        }

        initRoaming(mob: any) {
            var self = this;
            
            setInterval(function() {
                // _.each(self.entities, function(mob) {
                //     var canRoam = (random(20) === 1),
                //         pos: { x: any; y: any; };
                    
                //     if(canRoam) {
                //         if(!mob.hasTarget() && !mob.isDead) {
                //             pos = self._getRandomPositionInsideArea();
                //             mob.move(pos.x, pos.y);
                //         }
                //     }
                // });
            }, 500);
        }
        
        createReward() {
            var pos = this._getRandomPositionInsideArea();
            
            return { x: pos.x, y: pos.y, kind: Types.Entities.CHEST };
        }
    }

}