///<reference path="item.ts"/>
namespace main{
    export class Chest extends Item{
        items: any;
        constructor (id, x, y) {
            super(id, Types.Entities.CHEST, x, y);
        }
        
        setItems(items) {
            this.items = items;
        }
        
        getRandomItem() {
            var nbItems = _.size(this.items),
                item = null;
    
            if(nbItems > 0) {
                item = this.items[Utils.random(nbItems)];
            }
            return item;
        }
    }
}