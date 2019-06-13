
namespace server {
    export async function loadFile(filepath: string, code: string) {
        return new Promise<string>(function (resolve, reject) {
            fs.readFile(filepath, code, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    }
}