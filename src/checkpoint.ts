namespace main{
    export class Checkpoint {
        id: any;
        x: any;
        y: any;
        width: any;
        height: any;
        constructor (id, x, y, width, height) {
            this.id = id;
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }
        
        getRandomPosition () {
            var pos = {x:0,y:0};
            
            pos.x = this.x + Utils.randomInt(0, this.width - 1);
            pos.y = this.y + Utils.randomInt(0, this.height - 1);
            return pos;
        }
    }
}