namespace server {
    export class Server implements GameServer.IGameServer{
        /**
         * mode 是游戏 Server 处理客户端消息的模式。
         * 可以取值为 "sync" 或 "async"。
         * 当 mode 为 "sync" 时，游戏 Server 将使用同步模式处理客户端消息。
         * 开发者在 onClientData 回调中必须显式调用 SDK.exitAction 方法，
         * 游戏 Server 才能处理下一条 onClientData 广播。
         * 当 mode 为 "async" 时，游戏 Server 将使用异步模式处理客户端消息。
         * 每次监听到 onClientData 广播时都将执行回调函数。
         */
        public mode:'sync'|'async'

        constructor() {
            this.mode = 'async'
        }

        /**
         * 初始化游戏数据
         */
        onInitGameData(args: { room: IRoomInfo }) {
            let world = new WorldServer('world_1', 10)
            //世界开始运行
            world.run(config.map_filepath)
            GameData.InitGameData()
            console.log('初始化游戏数据完成')
            return {}
        }

        /**
         * 监听客户端数据
         */
        onClientData(args: ActionArgs<UserDefinedData>) {
            args.SDK.logger.debug('监听客户端数据')
            //发送消息给客户端
            args.SDK.sendData({ playerIdList: [], data: { msg: 'hello' } })
        }

        /**
         * 监听加房广播
         */
        onJoinRoom(args: ActionArgs<IJoinRoomBst>) {
            args.SDK.logger.debug('监听加房广播')
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
exports.gameServer = server.Server;