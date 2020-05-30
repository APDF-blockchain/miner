import { Config } from "./config";
import { HttpService } from "./http-service";
import { MinerService } from "./miner-service";

/**
 * @classdesc - the main class for this application
 * @class Miner
 */
export class Miner {

    /**
     * @description - the http service object
     */
    private httpService: HttpService;
    /**
     * @description - the miner service object
     */
    private minerService: MinerService;
    /**
     * @description - the configuration object
     */
    private config: Config;

    /**
     * @constructor - initialized this class object
     * @param args - arguments from the command line
     */
    constructor(args: any) {
        this.config = new Config();
        let url: string = args.url;
        let address: string = args.address;
        console.log('url=',url);
        if( url != null && url !== undefined ) {
            this.config.nodeUrl = url;
        }
        if( address != null && address !== undefined) {
            this.config.minerAddress = address;
        }

        console.log("New miner");
        this.minerService = new MinerService();
        this.httpService = new HttpService(this.minerService,this.config);
    }

    /**
     * @description - process a mining job that is requested from the blockchain node.
     */
    public processMiningJob(): void {
        let res = this.httpService.requestBlockFromNode();
        console.log('Miner.processMiningJob(): res=',res);
    }

    // /**
    //  * @description - for testing purposed only.  may be removed later.
    //  */
    // public processApreviousJob(): void {
    //     let addresses: string[] = [];
    //     for( let myAddress of this.minerService.getJobsMap().keys()) {
    //         console.log('myAddress=',myAddress);
    //         addresses.push(myAddress);
    //     }
    //     this.httpService.requestPreviousBlockFromNode(addresses[addresses.length - 1]);
    // }
}

/**
 * @description - get command line args. --url=<url of node> --address=<address of the miner>
 */
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

/**
 * @description - call the getArgs() function to process the command line args.
 */
const args = getArgs();
//console.log(args);
//--url=http://localhost:6001 for example
//--address="28Fcf7997E56f1Fadd4FA39fD834e5B96cb13b2B"

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
    while(count++ < 1) { // Eventually this will be a forever while loop.
    //while(true) {
        console.log("Do prcessing here.")
        miner.processMiningJob();
        await sleep(5000);
    }
}

/**
 * @description - run the application forever.
 */
run();