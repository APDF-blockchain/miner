import { Config } from "./config";
import { HttpService } from "./http-service";
import { MinerService } from "./miner-service";

export class Miner {

    public HttpService: HttpService;
    public MiningService: MinerService;
    constructor(args: any) {
        console.log("New miner");
        this.HttpService = new HttpService();
        this.MiningService = new MinerService();

    }

    public processMiningJob(): void {
        let res = this.HttpService.requestBlockFromNode();
        console.log('Miner.processMiningJob(): res=',res);
        this.MiningService.processMiningJob(res);
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
//console.log(args);
//--url=http://localhost:6001 for example

/**
 * @description - sleep for given number of ms.
 * @param {number} ms 
 */
function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * @description - run the program forever and process a request every 5 seconds.
 */
async function run() {
    let miner = new Miner(args);
    console.log('Three second sleep, showing sleep in a loop...');
    let count: number = 0;
    while(count++ < 5) {
        console.log("Do prcessing here.")
        miner.processMiningJob();
        await sleep(5000);
    }
}

run();