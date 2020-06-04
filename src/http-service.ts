//import * as rm from 'typed-rest-client/RestClient';
const axios = require('axios').default;
//import { HttpBinData } from './http-bin-data';
import { MinerService } from './miner-service';
import { Config } from './config';
import { SubmitBlock } from './model/submit-block';
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
export class HttpService {

    /**
     * @description - the url of the blockchain node
     */
    private nodeUrl: string;

    //private rest: rm.RestClient;

    /**
     * @constructor - initializes an object of this class
     * @param {MinerService} minerService - injection of the miner service
     * @param {Config} config - injection of the config object
     */
    constructor(private minerService: MinerService, private config: Config) {
        this.nodeUrl = config.nodeUrl;
        //this.rest = new rm.RestClient('miner-http-service');
    }

    /**
     * @description - request a block to be mined from the blockchain node.
     */
    public async requestBlockFromNode(): Promise<any> {
        try {
            let queryParameter = this.config.minerAddress;  // This is the address of miner.  The individual who has a mining rig.  How is it calculated?
            console.log('HttpService.requestBlockFromNode(): GET ' + this.nodeUrl + '/mining/get-mining-job/{' + queryParameter + '}');

            //let res: rm.IRestResponse<HttpBinData> = await this.rest.get<HttpBinData>(this.nodeUrl + '/mining/get-mining-job/' + queryParameter);
            let res = await axios.get(this.nodeUrl + '/mining/get-mining-job/'+queryParameter );
            console.log('HttpService.requestBlockFromNode(): status code=', res.status);
            console.log('HttpService.requestBlockFromNode(): data=', res.data);
            let minedBlock: SubmitBlock = this.minerService.processMiningJob(res.data);
            this.submitMinedBlockToBlockChainNode(minedBlock);
        } catch (err) {
            console.log(err.message);
            if(err.response !== undefined && err.response.data !== undefined) {
                console.log(err.response.data);
            }
            //console.log(err.result);
        }
    }

    public async submitMinedBlockToBlockChainNode(_minedBlock: SubmitBlock): Promise<any> {
        try {
            console.log('HttpService.submitMinedBlockToBlockChainNode(): POST ' + this.nodeUrl + '/mining/submit-mined-block');
            let submitBlock: SubmitBlock = new SubmitBlock();
            submitBlock.blockDataHash = _minedBlock.blockDataHash;
            submitBlock.dateCreated = _minedBlock.dateCreated;
            submitBlock.nonce = _minedBlock.nonce;
            submitBlock.blockHash = _minedBlock.blockHash;
            //let res: rm.IRestResponse<HttpBinData> = await this.rest.create<HttpBinData>(this.nodeUrl + '/mining/submit-mined-block', submitBlock);
            let res = await axios.post(this.nodeUrl + '/mining/submit-mined-block', submitBlock);
            console.log('HttpService.submitMinedBlockToBlockChainNode(): status code=', res.status);
            console.log('HttpService.submitMinedBlockToBlockChainNode(): data=', res.data);
            this.minerService.getJobsMap().delete(submitBlock.blockDataHash);
        } catch (err) {
            console.log(err.message);
            if(err.response !== undefined && err.response.data !== undefined) {
                console.log(err.response.data);
            }
            //console.log(err.result);
        }
    }

    // /**
    //  * @description - for testing purposes only.  may be removed later.
    //  * @param {string} address - address of miner
    //  */
    // public async requestPreviousBlockFromNode(address: string): Promise<any> {
    //     try {
    //         //let url = 'http://localhost:3001';
    //         let queryParameter = address;
    //         console.log('GET ' + this.nodeUrl + '/mining/get-mining-job/{' + queryParameter + '}');

    //         let rVal: HttpBinData;
    //         let rest: rm.RestClient = new rm.RestClient('miner-http-service');
    //         let res: rm.IRestResponse<HttpBinData> = await rest.get<HttpBinData>(this.nodeUrl + '/mining/get-mining-job/' + queryParameter);
    //         console.log('status code=', res.statusCode);
    //         console.log('result=', res.result);
    //         this.minerService.processMiningJob(res.result);
    //         rVal = res.result;
    //     } catch (err) {
    //         console.log(err.message);
    //     }
    // }
}