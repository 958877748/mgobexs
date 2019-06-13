namespace main{
    export class Item extends Entity{
        isStatic: boolean;
        isFromChest: boolean;
        blinkTimeout: any
        despawnTimeout: any
        respawn_callback: any;
        constructor (id, kind, x, y) {
            super(id, "item", kind, x, y);
            this.isStatic = false;
            this.isFromChest = false;
        }
        
        handleDespawn(params) {
            var self = this;
            
            this.blinkTimeout = setTimeout(function() {
                params.blinkCallback();
                self.despawnTimeout = setTimeout(params.despawnCallback, params.blinkingDuration);
            }, params.beforeBlinkDelay);
        }
        
        destroy() {
            if(this.blinkTimeout) {
                clearTimeout(this.blinkTimeout);
            }
            if(this.despawnTimeout) {
                clearTimeout(this.despawnTimeout);
            }
            
            if(this.isStatic) {
                this.scheduleRespawn(30000);
            }
        }
        
        scheduleRespawn(delay) {
            var self = this;
            setTimeout(function() {
                if(self.respawn_callback) {
                    self.respawn_callback();
                }
            }, delay);
        }
        
        onRespawn(callback) {
            this.respawn_callback = callback;
        }
    }
}