import { Block } from "./block";
import { HttpBinData } from "./http-bin-data";

export class MinerService {

    private jobs: Map<string, Block> = new Map<string, Block>();
    constructor() {
        console.log("MinerService");
    }

    public processMiningJob(job: any): string {
        //console.log('MinerService.processMiningJob(' + JSON.stringify(job) + '): called...');
        console.log('MinerService.processMiningJob(' + job + '): called...');
        let myBlock: Block = new Block();
        myBlock.blockDataHash = job.blockDataHash;
        myBlock.blockHash = job.blockHash;
        myBlock.dateCreated = job.dateCreated;
        myBlock.difficulty = job.difficulty;
        myBlock.index = job.index;
        myBlock.minedBy = job.minedBy;
        myBlock.nonce = job.nonce;
        myBlock.previousBlockHash = job.previousBlockHash;
        myBlock.reward = job.reward;
        myBlock.rewardAddress = job.rewardAddress;
        myBlock.timestamp = job.timestamp
        this.jobs.set(myBlock.blockDataHash, myBlock);
        let rVal: string = JSON.stringify('TBD');
        return rVal;
    }

    public getJobsMap(): Map<string, Block> {
        return this.jobs;
    }
}