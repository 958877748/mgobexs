namespace server {
	//PROTO-STRUCT-BEGIN
	export interface ICreateRoomBst {
		roomInfo?: (IRoomInfo | null);
	}
	export interface IJoinRoomBst {
		roomInfo?: (IRoomInfo | null);
		joinPlayerId?: (string | null);
	}
	export interface ILeaveRoomBst {
		roomInfo?: (IRoomInfo | null);
		leavePlayerId?: (string | null);
	}
	export interface IRemovePlayerBst {
		roomInfo?: (IRoomInfo | null);
		removePlayerId?: (string | null);
		owner?: (string | null);
	}
	export interface IChangeRoomBst {
		roomInfo?: (IRoomInfo | null);
		owner?: (string | null);
	}
	export interface IChangeCustomPlayerStatusBst {
		changePlayerId?: (string | null);
		customPlayerStatus?: (number | null);
		roomId?: (number | null);
		roomInfo?: (IRoomInfo | null);
	}
	export interface IChangedPlayerNetworkStateBst {
		changePlayerId?: (string | null);
		networkState?: (NetworkState | null);
		roomId?: (number | null);
		roomInfo?: (IRoomInfo | null);
	}
	export interface IMessageRelayBst {
		roomId?: (number | null);
		roomInfo?: (IRoomInfo | null);
	}
	export interface IDestroyRoomBst {
		roomId?: (number | null);
	}
	export interface IRoomInfo {
		relaySvrAddr?: (string | null);
		roomId?: (number | null);
		roomName?: (string | null);
		maxPlayers?: (number | null);
		roomType?: (string | null);
		isViewed?: (boolean | null);
		viewerList?: (IPlayerInfo[] | null);
		owner?: (string | null);
		playerList?: (IPlayerInfo[] | null);
		customProperties?: (string | null);
		createType?: (CreateType | null);
		isPrivate?: (boolean | null);
		frameStatus?: (FrameStatusType | null);
		frameRate?: (number | null);
		createTime?: (number | null);
		startGameTime?: (number | null);
		teams?: (ITeam[] | null);
	}
	export interface IPlayerInfo {
		playerId?: (string | null);
		playerName?: (string | null);
		customPlayerStatus?: (number | null);
		networkStatus?: (NetworkState | null);
		customProfile?: (string | null);
		relayNetworkStatus?: (NetworkState | null);
		teamId?: (string | null);
	}
	export enum CreateType {
		COMMONCREATE = 0,
		MATCHCREATE = 1
	}
	export enum FrameStatusType {
		STOP = 0,
		START = 1
	}
	export interface ITeam {
		teamId?: (string | null);
		name?: (string | null);
		minPlayers?: (number | null);
		maxPlayers?: (number | null);
	}
	export enum NetworkState {
		ROOM_OFFLINE = 0,
		ROOM_ONLINE = 1,
		RELAY_OFFLINE = 2,
		RELAY_ONLINE = 3
	}
	//PROTO-STRUCT-END

	export interface GameData {
		[key: string]: any;
	}

	export interface UserDefinedData {
		[key: string]: any;
	}

	interface ActionArgsExports {
		data: GameData
	}

	interface ActionArgsSDKLogger {
		debug: (...args: any[]) => void;
		info: (...args: any[]) => void;
		error: (...args: any[]) => void;
	}

	interface ActionArgsSDK {
		/**
		 * 游戏 Server 向客户端推送消息。
		 */
		sendData(data: { playerIdList: string[]; data: UserDefinedData; }, resendConf?: { timeout: number; maxTry: number; }): void
		/**
		 * 模拟客户端给游戏 Server 发送数据。
		 */
		dispatchAction(actionData: UserDefinedData): void
		/**
		 * `清空 onClientData 队列` 当 gameServer.mode 为 "sync" 时，gameServer.onClientData 广播会保存在一个队列里面，在 gameServer.onClientData 回调函数中通过调用 SDK.exitAction 才能处理下一条 gameServer.onClientData 广播。SDK.clearAction 作用就是清空 gameServer.onClientData 队列，可用于游戏结束后游戏 Server 忽略客户端消息的场景。
		 */
		clearAction(): void
		/**
		 * 当 gameServer.mode 为 "sync" 时，需要在 gameServer.onClientData 回调里面显式调用 SDK.exitAction 方法才能继续处理下一条 gameServer.onClientData 广播消息。
		 */
		exitAction(): void
		/**
		 * SDK 提供的日志记录能力。
		 * 记录的日志可以在 MGOBE 控制台的游戏 Server 页面查看。
		 */
		logger: ActionArgsSDKLogger
	}

	export interface ActionArgs<T> {
		/** 
		 * 该属性在 gameServer.onClientData 中有效，其类型为 string，
		 * 表示消息发送者的玩家 ID。 
		 **/
		sender: string;
		/** 
		 * 该属性在 gameServer 不同回调中的类型不同，表示该回调的
		 * 响应数据。比如在 gameServer.onClientData 中表示玩家发
		 * 送给游戏 Server 的数据；在 onJoinRoom 表示加房广播数据；
		 * 在 onLeaveRoom 中表示玩家退房广播数据。 
		 **/
		actionData: T;
		/**
		 * 该属性类型为 GameData，表示游戏数据，开发者可以用来实现
		 * 游戏状态同步等功能。在第一次执行 gameServer.onClientData 
		 * 时会被初始化，在执行 gameServer.onDestroyRoom 时会被销毁。
		 */
		gameData: GameData;
		/**
		 * 该属性类型为 IRoomInfo，表示当前房间信息。
		 */
		room: IRoomInfo
		/**
		 * 该属性类型为 object，包含了一个类型为 GameData 的子属性 
		 * data，用于更新游戏数据 gameData。
		 */
		exports: ActionArgsExports
		/** 
		 * 包含了一系列游戏 Server 提供的方法。 
		 **/
		SDK: ActionArgsSDK
	}

	export namespace GameServer {
		export type Receiver<T> = (data: ActionArgs<T>) => void;

		export type onClientData = Receiver<UserDefinedData>;

		export type onCreateRoom = Receiver<ICreateRoomBst>;
		export type onJoinRoom = Receiver<IJoinRoomBst>;
		export type onLeaveRoom = Receiver<ILeaveRoomBst>;
		export type onRemovePlayer = Receiver<IRemovePlayerBst>;
		export type onChangeRoom = Receiver<IChangeRoomBst>;
		export type onChangeCustomPlayerStatus = Receiver<IChangeCustomPlayerStatusBst>;
		export type onChangedPlayerNetworkState = Receiver<IChangedPlayerNetworkStateBst>;
		export type onMessageRelay = Receiver<IMessageRelayBst>;
		export type onDestroyRoom = Receiver<IDestroyRoomBst>;

		export interface IGameServer {
			mode?: 'async' | 'sync';
			onInitGameData(args: { room: IRoomInfo }): GameData;
			onClientData: onClientData;
			onCreateRoom?: onCreateRoom;
			onJoinRoom?: onJoinRoom;
			onLeaveRoom?: onLeaveRoom;
			onRemovePlayer?: onRemovePlayer;
			onChangeRoom?: onChangeRoom;
			onChangeCustomPlayerStatus?: onChangeCustomPlayerStatus;
			onChangedPlayerNetworkState?: onChangedPlayerNetworkState;
			onMessageRelay?: onMessageRelay;
			onDestroyRoom?: onDestroyRoom;
		}
	}
}