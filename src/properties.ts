namespace main{
    export class Properties {
        static rat = {
            drops: {
                flask: 40,
                burger: 10,
                firepotion: 5
            },
            hp: 25,
            armor: 1,
            weapon: 1
        }
        
        static skeleton = {
            drops: {
                flask: 40,
                mailarmor: 10,
                axe: 20,
                firepotion: 5
            },
            hp: 110,
            armor: 2,
            weapon: 2
        }
        
        static goblin = {
            drops: {
                flask: 50,
                leatherarmor: 20,
                axe: 10,
                firepotion: 5
            },
            hp: 90,
            armor: 2,
            weapon: 1
        }
        
        static ogre = {
            drops: {
                burger: 10,
                flask: 50,
                platearmor: 20,
                morningstar: 20,
                firepotion: 5
            },
            hp: 200,
            armor: 3,
            weapon: 2
        }
        
        static spectre = {
            drops: {
                flask: 30,
                redarmor: 40,
                redsword: 30,
                firepotion: 5
            },
            hp: 250,
            armor: 2,
            weapon: 4
        }
        
        static deathknight = {
            drops: {
                burger: 95,
                firepotion: 5
            },
            hp: 250,
            armor: 3,
            weapon: 3
        }
        
        static crab = {
            drops: {
                flask: 50,
                axe: 20,
                leatherarmor: 10,
                firepotion: 5
            },
            hp: 60,
            armor: 2,
            weapon: 1
        }
        
        static snake = {
            drops: {
                flask: 50,
                mailarmor: 10,
                morningstar: 10,
                firepotion: 5
            },
            hp: 150,
            armor: 3,
            weapon: 2
        }
        
        static skeleton2 = {
            drops: {
                flask: 60,
                platearmor: 15,
                bluesword: 15,
                firepotion: 5
            },
            hp: 200,
            armor: 3,
            weapon: 3
        }
        
        static eye = {
            drops: {
                flask: 50,
                redarmor: 20,
                redsword: 10,
                firepotion: 5
            },
            hp: 200,
            armor: 3,
            weapon: 3
        }
        
        static bat = {
            drops: {
                flask: 50,
                axe: 10,
                firepotion: 5
            },
            hp: 80,
            armor: 2,
            weapon: 1
        }
        
        static wizard = {
            drops: {
                flask: 50,
                platearmor: 20,
                firepotion: 5
            },
            hp: 100,
            armor: 2,
            weapon: 6
        }
        
        static boss = {
            drops: {
                goldensword: 100
            },
            hp: 700,
            armor: 6,
            weapon: 7
        }
    
    
    
        static getArmorLevel (kind) {
            try {
                if(Types.isMob(kind)) {
                    return Properties[Types.getKindAsString(kind)].armor;
                } else {
                    return Types.getArmorRank(kind) + 1;
                }
            } catch(e) {
                console.log("No level found for armor: "+Types.getKindAsString(kind));
            }
        };
        
        static getWeaponLevel (kind) {
            try {
                if(Types.isMob(kind)) {
                    return Properties[Types.getKindAsString(kind)].weapon;
                } else {
                    return Types.getWeaponRank(kind) + 1;
                }
            } catch(e) {
                console.log("No level found for weapon: "+Types.getKindAsString(kind));
            }
        };
        
        static getHitPoints (kind) {
            return Properties[Types.getKindAsString(kind)].hp;
        }
    }
    
    
    
}