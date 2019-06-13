declare namespace fs{
    /**
     * Valid types for path values in "fs".
     */
    type PathLike = string | Buffer | URL;

    /**
     * Asynchronously reads the entire contents of a file.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     * If a file descriptor is provided, the underlying file will _not_ be closed automatically.
     * @param options An object that may contain an optional flag.
     * If a flag is not provided, it defaults to `'r'`.
     */
    function readFile(path: PathLike | number, options: { encoding?: null; flag?: string; } | undefined | null, callback: (err: NodeJS.ErrnoException, data: Buffer) => void): void;

    /**
     * Asynchronously reads the entire contents of a file.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     * URL support is _experimental_.
     * If a file descriptor is provided, the underlying file will _not_ be closed automatically.
     * @param options Either the encoding for the result, or an object that contains the encoding and an optional flag.
     * If a flag is not provided, it defaults to `'r'`.
     */
    function readFile(path: PathLike | number, options: { encoding: string; flag?: string; } | string, callback: (err: NodeJS.ErrnoException, data: string) => void): void;

    /**
     * Asynchronously reads the entire contents of a file.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     * URL support is _experimental_.
     * If a file descriptor is provided, the underlying file will _not_ be closed automatically.
     * @param options Either the encoding for the result, or an object that contains the encoding and an optional flag.
     * If a flag is not provided, it defaults to `'r'`.
     */
    function readFile(
        path: PathLike | number,
        options: { encoding?: string | null; flag?: string; } | string | undefined | null,
        callback: (err: NodeJS.ErrnoException, data: string | Buffer) => void,
    ): void;

    /**
     * Asynchronously reads the entire contents of a file.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     * If a file descriptor is provided, the underlying file will _not_ be closed automatically.
     */
    function readFile(path: PathLike | number, callback: (err: NodeJS.ErrnoException, data: Buffer) => void): void;

    // NOTE: This namespace provides design-time support for util.promisify. Exported members do not exist at runtime.
    namespace readFile {
        /**
         * Asynchronously reads the entire contents of a file.
         * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
         * If a file descriptor is provided, the underlying file will _not_ be closed automatically.
         * @param options An object that may contain an optional flag.
         * If a flag is not provided, it defaults to `'r'`.
         */
        function __promisify__(path: PathLike | number, options?: { encoding?: null; flag?: string; } | null): Promise<Buffer>;

        /**
         * Asynchronously reads the entire contents of a file.
         * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
         * URL support is _experimental_.
         * If a file descriptor is provided, the underlying file will _not_ be closed automatically.
         * @param options Either the encoding for the result, or an object that contains the encoding and an optional flag.
         * If a flag is not provided, it defaults to `'r'`.
         */
        function __promisify__(path: PathLike | number, options: { encoding: string; flag?: string; } | string): Promise<string>;

        /**
         * Asynchronously reads the entire contents of a file.
         * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
         * URL support is _experimental_.
         * If a file descriptor is provided, the underlying file will _not_ be closed automatically.
         * @param options Either the encoding for the result, or an object that contains the encoding and an optional flag.
         * If a flag is not provided, it defaults to `'r'`.
         */
        function __promisify__(path: PathLike | number, options?: { encoding?: string | null; flag?: string; } | string | null): Promise<string | Buffer>;
    }
}


declare var process:any
declare function getIO():any
declare var _:any
declare var sanitizer:any
/** 分布式的高速缓存系统 */
declare namespace memcache{
    export class Client{
        constructor(p1:any,p2:any)
    }
}

interface 配置{
    /** IP */
    host:string,
    /** 端口号 */
    port:number,
    /** 调试等级 */
    debug_level:string,
    /** 每个世界的玩家数量上限 */
    nb_players_per_world:number
    /** 世界数量上限 */
    nb_worlds:number,
    /** 地图文件路径 */
    map_filepath:string,
    /** 这个应该时是否使用分布式缓存系统 */
    metrics_enabled:boolean
}