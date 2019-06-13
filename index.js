fs = require('fs')
_ = require('./underscore-min')
var server = require('./bundle')
var gameServer = new server.gameServer()
exports.mgobexsCode = {
    //logLevelSDK?: 'debug+' | 'info+' | 'error+'
    //logLevel?: 'debug+' | 'info+' | 'error+'
    gameServer: gameServer
}