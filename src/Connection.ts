namespace server {
    export class Connection {
        id: string
        SDK: ActionArgsSDK

        constructor(id: string, SDK: ActionArgsSDK) {
            this.id = id
            this.SDK = SDK
        }

        on_listen: (msg: any) => void

        /**
         * 监听此客户端发来消息
         * @param fun 回调函数
         */
        listen(fun: (msg: any) => void) {
            this.on_listen = fun
        }

        on_Close: () => void

        /**
         * 监听连接关闭
         */
        onClose(fun: () => void) {
            this.on_Close = fun
        }

        /**
         * 发送消息给客户端
         * @param msg 
         */
        send(msg: string) {
            this.SDK.sendData({ playerIdList: [this.id], data: { msg: msg } })
        }

        /**
         * 发送UTF8字符串给客户端
         * @param msg 
         */
        sendUTF8(msg: string) {
            this.send(msg)
        }

        /**
         * 与客户端断开连接
         * @param msg 原因
         */
        close(msg: string) {

        }

        // onError(function () {
        //     //输出异常日志
        //     console.error(Array.prototype.join.call(arguments, ", "))
        // })

        // onRequestStatus(function () {
        //     return JSON.stringify(getWorldDistribution(worlds))
        // })
    }
}