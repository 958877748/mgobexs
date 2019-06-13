var server;
(function (server) {
    class GameData {
        static async InitGameData() {
            let p = server.loadFile('config.json', 'utf8');
            let config = await p;
            console.log(config);
        }
    }
    server.GameData = GameData;
})(server || (server = {}));
var server;
(function (server) {
    class gameServer {
        constructor() {
            this.mode = 'async';
        }
        onInitGameData(args) {
            server.GameData.InitGameData();
            console.log('初始化游戏数据完成');
            return {};
        }
        onClientData(args) {
            args.SDK.logger.debug('监听客户端数据');
            args.SDK.sendData({ playerIdList: [], data: { msg: 'hello' } });
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
var server;
(function (server) {
    async function loadFile(filepath, code) {
        return new Promise(function (resolve, reject) {
            fs.readFile(filepath, code, (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
        });
    }
    server.loadFile = loadFile;
})(server || (server = {}));
var server;
(function (server) {
    let CreateType;
    (function (CreateType) {
        CreateType[CreateType["COMMONCREATE"] = 0] = "COMMONCREATE";
        CreateType[CreateType["MATCHCREATE"] = 1] = "MATCHCREATE";
    })(CreateType = server.CreateType || (server.CreateType = {}));
    let FrameStatusType;
    (function (FrameStatusType) {
        FrameStatusType[FrameStatusType["STOP"] = 0] = "STOP";
        FrameStatusType[FrameStatusType["START"] = 1] = "START";
    })(FrameStatusType = server.FrameStatusType || (server.FrameStatusType = {}));
    let NetworkState;
    (function (NetworkState) {
        NetworkState[NetworkState["ROOM_OFFLINE"] = 0] = "ROOM_OFFLINE";
        NetworkState[NetworkState["ROOM_ONLINE"] = 1] = "ROOM_ONLINE";
        NetworkState[NetworkState["RELAY_OFFLINE"] = 2] = "RELAY_OFFLINE";
        NetworkState[NetworkState["RELAY_ONLINE"] = 3] = "RELAY_ONLINE";
    })(NetworkState = server.NetworkState || (server.NetworkState = {}));
})(server || (server = {}));
//# sourceMappingURL=bundle.js.map