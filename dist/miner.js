"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Miner = void 0;
const config_1 = require("./config");
const http_service_1 = require("./http-service");
const miner_service_1 = require("./miner-service");
/**
 * @classdesc - the main class for this application
 * @class Miner
 */
class Miner {
    /**
     * @constructor - initialized this class object
     * @param args - arguments from the command line
     */
    constructor(args) {
        this.config = new config_1.Config();
        let url = args.url;
        let address = args.address;
        console.log('url=', url);
        console.log('address=', address);
        if (url != null && url !== undefined) {
            this.config.nodeUrl = url;
        }
        if (address != null && address !== undefined) {
            this.config.minerAddress = address;
        }
        console.log("New miner");
        this.minerService = new miner_service_1.MinerService();
        this.httpService = new http_service_1.HttpService(this.minerService, this.config);
    }
    /**
     * @description - process a mining job that is requested from the blockchain node.
     */
    processMiningJob() {
        let res = this.httpService.requestBlockFromNode();
        console.log('Miner.processMiningJob(): res=', res);
    }
}
exports.Miner = Miner;
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
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
/**
 * @description - run the program forever and process a request every 5 seconds.
 */
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        let miner = new Miner(args);
        console.log('Three second sleep, showing sleep in a loop...');
        let count = 0;
        //while(count++ < 1) { // Eventually this will be a forever while loop.
        while (true) {
            console.log("Do prcessing here.");
            miner.processMiningJob();
            yield sleep(5000);
        }
    });
}
/**
 * @description - run the application forever.
 */
run();
//# sourceMappingURL=miner.js.map