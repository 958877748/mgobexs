namespace main{
    export class Formulas{
        static dmg(weaponLevel, armorLevel){
            var dealt = weaponLevel * Utils.randomInt(5, 10),
            absorbed = armorLevel * Utils.randomInt(1, 3),
            dmg =  dealt - absorbed;
        
            //console.log("abs: "+absorbed+"   dealt: "+ dealt+"   dmg: "+ (dealt - absorbed));
            if(dmg <= 0) {
                return Utils.randomInt(0, 3);
            } else {
                return dmg;
            }
        }
    
        static hp (armorLevel) {
            var hp = 80 + ((armorLevel - 1) * 30);
            return hp;
        }
    }
}