import * as rm from 'typed-rest-client/RestClient';
import { HttpBinData } from './http-bin-data';
import { MinerService } from './miner-service';
import { Block } from './block';
import { Config } from './config';
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

    /**
     * @constructor - initializes an object of this class
     * @param {MinerService} minerService - injection of the miner service
     * @param {Config} config - injection of the config object
     */
    constructor(private minerService: MinerService, private config: Config) {
        this.nodeUrl = config.nodeUrl;
    }

    /**
     * @description - request a block to be mined from the blockchain node.
     */
    public async requestBlockFromNode(): Promise<any> {
        try {
            //let queryParameter = 'http:%2f%2flocalhost:5001';
            // Can we use a metamask account?
            let queryParameter = this.config.minerAddress;  // This is the address of miner.  The individual who has a mining rig.  How is it calculated?
            console.log('GET ' + this.nodeUrl + '/mining/get-mining-job/{' + queryParameter + '}');

            let rVal: HttpBinData;
            let rest: rm.RestClient = new rm.RestClient('miner-http-service');
            let res: rm.IRestResponse<HttpBinData> = await rest.get<HttpBinData>(this.nodeUrl + '/mining/get-mining-job/' + queryParameter);
            console.log('status code=', res.statusCode);
            console.log('result=', res.result);
            this.minerService.processMiningJob(res.result);
            rVal = res.result;
        } catch (err) {
            console.log(err.message);
        }
    }

    /**
     * @description - for testing purposes only.  may be removed later.
     * @param {string} address - address of miner
     */
    public async requestPreviousBlockFromNode(address: string): Promise<any> {
        try {
            //let url = 'http://localhost:3001';
            let queryParameter = address;
            console.log('GET ' + this.nodeUrl + '/mining/get-mining-job/{' + queryParameter + '}');

            let rVal: HttpBinData;
            let rest: rm.RestClient = new rm.RestClient('miner-http-service');
            let res: rm.IRestResponse<HttpBinData> = await rest.get<HttpBinData>(this.nodeUrl + '/mining/get-mining-job/' + queryParameter);
            console.log('status code=', res.statusCode);
            console.log('result=', res.result);
            this.minerService.processMiningJob(res.result);
            rVal = res.result;
        } catch (err) {
            console.log(err.message);
        }
    }
}