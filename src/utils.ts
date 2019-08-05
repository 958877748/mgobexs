namespace server {
    export namespace Utils {
        export function sanitize(string) {
            // Strip unsafe tags, then escape as html entities.
            return sanitizer.escape(sanitizer.sanitize(string));
        }

        export function random(range:number) {
            return Math.floor(Math.random() * range)
        }

        export function randomRange(min, max) {
            return min + (Math.random() * (max - min))
        }

        export function randomInt(min, max) {
            return min + Math.floor(Math.random() * (max - min + 1))
        }

        export function clamp(min, max, value) {
            if (value < min) {
                return min
            } else if (value > max) {
                return max
            } else {
                return value
            }
        }

        export function randomOrientation() {
            var o, r = random(4)

            if (r === 0)
                o = Types.Orientations.LEFT
            if (r === 1)
                o = Types.Orientations.RIGHT
            if (r === 2)
                o = Types.Orientations.UP
            if (r === 3)
                o = Types.Orientations.DOWN

            return o
        }

        export function Mixin(target, source) {
            if (source) {
                for (var key, keys = Object.keys(source), l = keys.length; l--;) {
                    key = keys[l]

                    if (source.hasOwnProperty(key)) {
                        target[key] = source[key]
                    }
                }
            }
            return target
        }

        export function distanceTo(x, y, x2, y2) {
            var distX = Math.abs(x - x2)
            var distY = Math.abs(y - y2)

            return (distX > distY) ? distX : distY
        }
    }
}