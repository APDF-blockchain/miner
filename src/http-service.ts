import * as rm from 'typed-rest-client/RestClient';
import { HttpBinData } from './http-bin-data';
import { MinerService } from './miner-service';
// export interface HttpBinData {
//     url: string;
//     data: any;
//     json: any;
//     args?: any
// }
export class HttpService {

    constructor() {
    }

    public async requestBlockFromNode(): Promise<any> {
        let url = 'http://localhost:3001';
        let queryParameter = 'http:%2f%2flocalhost:5001';
        console.log('GET ' + url + '/mining/get-mining-job/{' + queryParameter + '}');

        let rVal: HttpBinData;
        let rest: rm.RestClient = new rm.RestClient('miner-http-service');
        let res: rm.IRestResponse<HttpBinData> = await rest.get<HttpBinData>(url + '/mining/get-mining-job/'+queryParameter);
        console.log('status code=',res.statusCode);
        console.log('result=', res.result);
        rVal = res.result;
        return rVal;
    }
}