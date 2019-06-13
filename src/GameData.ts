
namespace server {
    export class GameData {
        static async InitGameData() {
            //1.加载配置文件
            //let config = readFile('config.json','utf8',(err,data)=>{
            let p = loadFile('config.json', 'utf8')
            let config = await p
            console.log(config)
        }
    }
}