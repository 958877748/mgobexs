var server;
(function (server) {
    class gameServer {
        constructor() {
            this.mode = 'async';
        }
        onInitGameData() {
            return {};
        }
        onClientData(args) {
            args.SDK.logger.debug('监听客户端数据');
            args.SDK.sendData({ playerIdList: [], data: { msg: 'hello' } });
            args.SDK.exitAction();
        }
        onJoinRoom(args) {
            args.SDK.logger.debug('监听加房广播');
        }
        onCreateRoom(args) {
            args.SDK.logger.debug('监听创建房间广播');
        }
        onLeaveRoom(args) {
            args.SDK.logger.debug('监听退房广播');
        }
        onRemovePlayer(args) {
            args.SDK.logger.debug('监听退房广播');
        }
        onDestroyRoom(args) {
            args.SDK.logger.debug('监听房间销毁广播');
        }
        onChangeRoom(args) {
            args.SDK.logger.debug('监听修改房间属性广播');
        }
        onChangeCustomPlayerStatus(args) {
            args.SDK.logger.debug('监听修改玩家自定义状态广播');
        }
        onChangedPlayerNetworkState(args) {
            args.SDK.logger.debug('监听修改玩家自定义状态广播');
        }
        onMessageRelay(args) {
            args.SDK.logger.debug('监听开始/停止帧同步广播');
        }
    }
    server.gameServer = gameServer;
})(server || (server = {}));
var exports;
exports.gameServer = server.gameServer;
//# sourceMappingURL=bundle.js.map