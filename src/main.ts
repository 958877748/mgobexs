namespace main {
    export function main() {
        let 服务器配置文件路径 = 'dist/config.json'
        fs.readFile(服务器配置文件路径, 'utf8', function (异常, JSON数据) {
            if (异常) {
                console.error("无法打开配置文件:", 异常.path);
            } else {
                服务器配置加载完成(JSON.parse(JSON数据))
            }
        })
    }

    /** 获取所有世界的玩家分布 */
    function getWorldDistribution(worlds: Array<worldserver>) {
        let distribution = []

        for (let index = 0; index < worlds.length; index++) {
            const world = worlds[index]
            distribution.push(world.playerCount)
        }
        return distribution
    }

    function 服务器配置加载完成(config: 配置) {
        //创建服务器
        let 服务器 = new SocketIOServer(config.host, config.port)

        //创建世界服务器
        let worlds = new Array<worldserver>()
        for (let index = 1; index <= config.nb_worlds; index++) {
            //生成世界id
            let id = 'world' + index
            //创建世界
            let world = new worldserver(id, config.nb_players_per_world, 服务器)
            //世界开始运行
            world.run(config.map_filepath)
            //引用存入数组
            worlds.push(world)
        }

        //当服务器有新的连接进入
        服务器.onConnect(function (connection) {

            // 只需按顺序将玩家放入每个世界服务器,前一个满了就下一个
            for (let index = 0; index < worlds.length; index++) {
                
                //取出一个世界服务器
                const world = worlds[index]

                //如果世界玩家数量小于配置中的最大玩家数量
                if(world.playerCount < config.nb_players_per_world){

                    world.updatePopulation()

                    let player = new Player(connection, world)

                    world.connect_callback(player)

                    return 
                }
            }
            console.log('有一个玩家连接上了服务器,可是所有服务器爆满')
        })

        //当服务器发生异常
        服务器.onError(function () {
            //输出异常日志
            console.error(Array.prototype.join.call(arguments, ", "))
        })

        服务器.onRequestStatus(function () {
            return JSON.stringify(getWorldDistribution(worlds))
        })

        process.on('uncaughtException', function (e: any) {
            console.error('uncaughtException: ' + e)
        })
    }
}

//将main命名空间引用置于exports上
var exports: any;
exports.main = main;