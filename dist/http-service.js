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
exports.HttpService = void 0;
//import * as rm from 'typed-rest-client/RestClient';
const axios = require('axios').default;
const submit_block_1 = require("./model/submit-block");
// export interface HttpBinData {
//     url: string;
//     data: any;
//     json: any;
//     args?: any
// }
/**
 * @classdesc - this class contains the attributes and method to perform any http requests to the blockchain node.
 * @class HttpService
 */
class HttpService {
    //private rest: rm.RestClient;
    /**
     * @constructor - initializes an object of this class
     * @param {MinerService} minerService - injection of the miner service
     * @param {Config} config - injection of the config object
     */
    constructor(minerService, config) {
        this.minerService = minerService;
        this.config = config;
        this.nodeUrl = config.nodeUrl;
        //this.rest = new rm.RestClient('miner-http-service');
    }
    /**
     * @description - request a block to be mined from the blockchain node.
     */
    requestBlockFromNode() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let queryParameter = this.config.minerAddress; // This is the address of miner.  The individual who has a mining rig.  How is it calculated?
                console.log('HttpService.requestBlockFromNode(): GET ' + this.nodeUrl + '/mining/get-mining-job/{' + queryParameter + '}');
                //let res: rm.IRestResponse<HttpBinData> = await this.rest.get<HttpBinData>(this.nodeUrl + '/mining/get-mining-job/' + queryParameter);
                let res = yield axios.get(this.nodeUrl + '/mining/get-mining-job/' + queryParameter);
                console.log('HttpService.requestBlockFromNode(): status code=', res.status);
                console.log('HttpService.requestBlockFromNode(): data=', res.data);
                let minedBlock = this.minerService.processMiningJob(res.data);
                this.submitMinedBlockToBlockChainNode(minedBlock);
            }
            catch (err) {
                console.log(err.message);
                if (err.response !== undefined && err.response.data !== undefined) {
                    console.log(err.response.data);
                }
                //console.log(err.result);
            }
        });
    }
    submitMinedBlockToBlockChainNode(_minedBlock) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('HttpService.submitMinedBlockToBlockChainNode(): POST ' + this.nodeUrl + '/mining/submit-mined-block');
                let submitBlock = new submit_block_1.SubmitBlock();
                submitBlock.blockDataHash = _minedBlock.blockDataHash;
                submitBlock.dateCreated = _minedBlock.dateCreated;
                submitBlock.nonce = _minedBlock.nonce;
                submitBlock.blockHash = _minedBlock.blockHash;
                //let res: rm.IRestResponse<HttpBinData> = await this.rest.create<HttpBinData>(this.nodeUrl + '/mining/submit-mined-block', submitBlock);
                let res = yield axios.post(this.nodeUrl + '/mining/submit-mined-block', submitBlock);
                console.log('HttpService.submitMinedBlockToBlockChainNode(): status code=', res.status);
                console.log('HttpService.submitMinedBlockToBlockChainNode(): data=', res.data);
                this.minerService.getJobsMap().delete(submitBlock.blockDataHash);
            }
            catch (err) {
                console.log(err.message);
                if (err.response !== undefined && err.response.data !== undefined) {
                    console.log(err.response.data);
                }
                //console.log(err.result);
            }
        });
    }
}
exports.HttpService = HttpService;
//# sourceMappingURL=http-service.js.map