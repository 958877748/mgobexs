namespace server {
    export class gameServer implements GameServer.IGameServer {
        /**
         * mode 是游戏 Server 处理客户端消息的模式。
         * 可以取值为 "sync" 或 "async"。
         * 当 mode 为 "sync" 时，游戏 Server 将使用同步模式处理客户端消息。
         * 开发者在 onClientData 回调中必须显式调用 SDK.exitAction 方法，
         * 游戏 Server 才能处理下一条 onClientData 广播。
         * 当 mode 为 "async" 时，游戏 Server 将使用异步模式处理客户端消息。
         * 每次监听到 onClientData 广播时都将执行回调函数。
         */
        public mode: 'sync' | 'async'

        /**
         * 世界服务器
         */
        public world: WorldServer

        /**
         * 所有玩家连接
         */
        public connections: { [x: string]: Connection } = {}

        world_data:any
        public sdk: ActionArgsSDK
        public log: Array<any> = []

        constructor(world_data:any) {
            this.mode = 'async'
            setTimeout(this.sendLog.bind(this), 10000)
            this.world_data = world_data

            process.on('uncaughtException', function (e: any) {
                this.log.push('uncaughtException: ' + e)
            })
        }

        sendLog() {
            setTimeout(this.sendLog.bind(this), 10000)
            if (this.log.length > 0 && this.sdk) {
                let logdata = this.log
                this.sdk.sendData({ playerIdList: [], data: { log: logdata } })
                this.log = []
            } else if (this.sdk) {
                this.sdk.sendData({ playerIdList: [], data: 'no fand log' })
            } else {
                this.log.push('没有 this.sdk 对象')
            }
        }

        /**
         * 初始化游戏数据
         */
        onInitGameData(args: { room: IRoomInfo }) {
            try {
                let world = new WorldServer('world_1', 100)
                world.run('./world_server.json')
                this.world = world
                return {}
            } catch (error) {
                this.log.push(JSON.stringify(error))
                return {}
            }
        }

        /**
         * 监听客户端发来消息
         */
        async onClientData(args: ActionArgs<UserDefinedData>) {
            try {
                this.sdk = args.SDK
                //找到对应的连接,下发消息
                let playId = args.sender
                let connection = this.connections[playId]
                if (connection) {
                    if (connection.on_listen) {
                        //connection.on_listen(args.actionData)
                        connection.send('onClientData yes')
                    } else {
                        connection.send('no find connection.on_listen')
                    }
                } else {
                    this.log.push('no find connection')
                }
            } catch (error) {
                this.log.push(JSON.stringify(error))
            }
        }

        /**
         * 监听加房广播
         */
        onJoinRoom(args: ActionArgs<IJoinRoomBst>) {
            try {
                //创建一条连接
                let id = args.actionData.joinPlayerId
                let connection = new Connection(id, args.SDK)
                this.connections[id] = connection
                this.world.updatePopulation()
                let player = new Player(connection, this.world)
                this.world.connect_callback(player)
            } catch (error) {
                this.log.push(JSON.stringify(error))
            }
        }

        /**
         * 监听创建房间广播
         */
        onCreateRoom(args: ActionArgs<ICreateRoomBst>) {
            args.SDK.logger.debug('监听创建房间广播')
        }

        /**
         * 监听退房广播
         */
        onLeaveRoom(args: ActionArgs<ILeaveRoomBst>) {
            args.SDK.logger.debug('监听退房广播')
        }

        /**
         * 监听玩家被移除广播
         */
        onRemovePlayer(args: ActionArgs<IRemovePlayerBst>) {
            args.SDK.logger.debug('监听退房广播')
        }

        /**
         * 监听房间销毁广播
         */
        onDestroyRoom(args: ActionArgs<IDestroyRoomBst>) {
            args.SDK.logger.debug('监听房间销毁广播')
        }

        /**
         * 监听修改房间属性广播
         */
        onChangeRoom(args: ActionArgs<IChangeRoomBst>) {
            args.SDK.logger.debug('监听修改房间属性广播')
        }

        /**
         * 监听修改玩家自定义状态广播
         */
        onChangeCustomPlayerStatus(args: ActionArgs<IChangeCustomPlayerStatusBst>) {
            args.SDK.logger.debug('监听修改玩家自定义状态广播')
        }

        /**
         * 监听玩家网络状态变化广播
         */
        onChangedPlayerNetworkState(args: ActionArgs<IChangedPlayerNetworkStateBst>) {
            args.SDK.logger.debug('监听修改玩家自定义状态广播')
        }

        /**
         * 监听开始/停止帧同步广播
         */
        onMessageRelay(args: ActionArgs<IMessageRelayBst>) {
            args.SDK.logger.debug('监听开始/停止帧同步广播')
        }
    }
}
//将 gameServer 类引用置于 exports 上
var exports: any;
exports.gameServer = server.gameServer;