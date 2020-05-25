import { P2P } from "./p2p";
import { HttpServer } from "./httpserver";
import { Config } from "./config";

export class Miner {
    /**
     * @description - the peer-to-peer server
     */
    public p2p: P2P;
    /**
     * @description - the http server that responds to http requests
     */
    public httpServer: HttpServer;
    /**
     * @description - configuration object
     */
    public config: Config = new Config();
    /**
     * @description - http port for the http server
     */
    public httpPort: number = parseInt(process.env.HTTP_PORT) || this.config.defaultServerPort;
    /**
     * @description - p2p port number for the p2p server
     */
    public p2pPort: number = parseInt(process.env.P2P_PORT) || this.config.defaultP2pPort;
    /**
     * @description - comma separated list of peer urls.
     */
    public initialPeers: string[] = process.env.PEERS ? process.env.PEERS.split(',') : [];

    constructor(args: any) {
        console.log(this.initialPeers);
        this.p2p = new P2P();
        this.httpServer = new HttpServer(this.p2p);
        this.httpServer.initHttpServer(this.httpPort);
        this.p2p.initP2PServer(this.p2pPort);
        this.p2p.connectToPeers(this.initialPeers);
    }
}

function getArgs() {
    const args = {};
    process.argv
        .slice(2, process.argv.length)
        .forEach(arg => {
            // long arg
            if (arg.slice(0, 2) === '--') {
                const longArg = arg.split('=');
                const longArgFlag = longArg[0].slice(2, longArg[0].length);
                const longArgValue = longArg.length > 1 ? longArg[1] : true;
                args[longArgFlag] = longArgValue;
            }
            // flags
            else if (arg[0] === '-') {
                const flags = arg.slice(1, arg.length).split('');
                flags.forEach(flag => {
                    args[flag] = true;
                });
            }
        });
    return args;
}
const args = getArgs();
console.log(args);
//--url=http://localhost:6001 for example
let run = new Miner(args);