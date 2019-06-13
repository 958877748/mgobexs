namespace main {
    export namespace Messages {
        class Message { }
        export class Spawn extends Message {
            entity: any;
            constructor(entity) {
                super()
                this.entity = entity;
            }
            serialize() {

                var spawn = [Types.Messages.SPAWN];
                return spawn.concat(this.entity.getState());
            }
        }

        export class Despawn extends Message {
            entityId: any;
            constructor(entityId) {
                super()
                this.entityId = entityId;
            }
            serialize() {
                return [Types.Messages.DESPAWN, this.entityId];
            }
        }

        export class Move extends Message {
            entity: any;
            constructor(entity) {
                super()
                this.entity = entity;
            }
            serialize() {
                return [Types.Messages.MOVE,
                this.entity.id,
                this.entity.x,
                this.entity.y];
            }
        }

        export class LootMove extends Message {
            item: any;
            entity: any;
            constructor(entity, item) {
                super()
                this.entity = entity;
                this.item = item;
            }
            serialize() {
                return [Types.Messages.LOOTMOVE,
                this.entity.id,
                this.item.id];
            }
        }

        export class Attack extends Message {
            targetId: any;
            attackerId: any;
            constructor(attackerId, targetId) {
                super()
                this.attackerId = attackerId;
                this.targetId = targetId;
            }
            serialize() {
                return [Types.Messages.ATTACK,
                this.attackerId,
                this.targetId];
            }
        }

        export class Health extends Message {
            isRegen: any;
            points: any;
            constructor(points, isRegen) {
                super()
                this.points = points;
                this.isRegen = isRegen;
            }
            serialize() {
                var health = [Types.Messages.HEALTH,
                this.points];

                if (this.isRegen) {
                    health.push(1);
                }
                return health;
            }
        }

        export class HitPoints extends Message {
            maxHitPoints: any;
            constructor(maxHitPoints) {
                super()
                this.maxHitPoints = maxHitPoints;
            }
            serialize() {
                return [Types.Messages.HP,
                this.maxHitPoints];
            }
        }

        export class EquipItem extends Message {
            playerId: any;
            itemKind: any;
            constructor(player, itemKind) {
                super()
                this.playerId = player.id;
                this.itemKind = itemKind;
            }
            serialize() {
                return [Types.Messages.EQUIP,
                this.playerId,
                this.itemKind];
            }
        }

        export class Drop extends Message {
            mob: any;
            item: any;
            constructor(mob, item) {
                super()
                this.mob = mob;
                this.item = item;
            }
            serialize() {
                var drop = [Types.Messages.DROP,
                this.mob.id,
                this.item.id,
                this.item.kind,
                _.pluck(this.mob.hatelist, "id")];

                return drop;
            }
        }

        export class Chat extends Message {
            message: any;
            playerId: any;
            constructor(player, message) {
                super()
                this.playerId = player.id;
                this.message = message;
            }
            serialize() {
                return [Types.Messages.CHAT,
                this.playerId,
                this.message];
            }
        }

        export class Teleport extends Message {
            entity: any;
            constructor(entity) {
                super()
                this.entity = entity;
            }
            serialize() {
                return [Types.Messages.TELEPORT,
                this.entity.id,
                this.entity.x,
                this.entity.y];
            }
        }

        export class Damage extends Message {
            points: any;
            entity: any;
            constructor(entity, points) {
                super()
                this.entity = entity;
                this.points = points;
            }
            serialize() {
                return [Types.Messages.DAMAGE,
                this.entity.id,
                this.points];
            }
        }

        export class Population extends Message {
            world: any;
            total: any;
            constructor(world, total) {
                super()
                this.world = world;
                this.total = total;
            }
            serialize() {
                return [Types.Messages.POPULATION,
                this.world,
                this.total];
            }
        }

        export class Kill extends Message {
            mob: any;
            constructor(mob) {
                super()
                this.mob = mob;
            }
            serialize() {
                return [Types.Messages.KILL,
                this.mob.kind];
            }
        }

        export class List extends Message {
            ids: any;
            constructor(ids) {
                super()
                this.ids = ids;
            }
            serialize() {
                var list = this.ids;

                list.unshift(Types.Messages.LIST);
                return list;
            }
        }

        export class Destroy extends Message {
            entity: any;
            constructor(entity) {
                super()
                this.entity = entity;
            }
            serialize() {
                return [Types.Messages.DESTROY,
                this.entity.id];
            }
        }

        export class Blink extends Message {
            item: any;
            constructor(item) {
                super()
                this.item = item;
            }
            serialize() {
                return [Types.Messages.BLINK,
                this.item.id];
            }
        }
    }
}