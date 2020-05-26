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
export class HttpService {

    private nodeUrl: string;

    constructor(private minerService: MinerService, private config: Config) {
        this.nodeUrl = config.nodeUrl;
    }

    public async requestBlockFromNode(): Promise<any> {
        try {
            //let queryParameter = 'http:%2f%2flocalhost:5001';
            let queryParameter = 'newblockrequest';
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