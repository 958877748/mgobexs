fs = require('fs')
_ = require('./underscore-min')
let bundle = require('./bundle')
let world_data = require('./world_server')
let s = new bundle.gameServer(world_data)
exports.mgobexsCode = {
    //logLevelSDK?: 'debug+' | 'info+' | 'error+'
    //logLevel?: 'debug+' | 'info+' | 'error+'
    gameServer: s
}