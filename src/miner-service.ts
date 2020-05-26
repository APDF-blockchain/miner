export class MinerService {
    constructor() {
        console.log("MinerService");
    }

    public processMiningJob(job: any): string {
        console.log('MinerService.processMiningJob(' + JSON.stringify(job) + '): called...');
        let rVal: string = JSON.stringify('TBD');
        return rVal;
    }
}