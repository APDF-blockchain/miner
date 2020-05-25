import { Config } from "./config";
import { HttpService } from "./http-service";

export class Miner {

    public HttpService: HttpService;
    constructor(args: any) {
        console.log("New miner");
        this.HttpService = new HttpService();
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
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
    //console.log('Taking a break...');
    //await sleep(2000);
    let miner = new Miner(args);
    console.log('Three second sleep, showing sleep in a loop...');

    while(true) {
        await sleep(5000);
        console.log("Do prcessing here.")
    }
}

run();