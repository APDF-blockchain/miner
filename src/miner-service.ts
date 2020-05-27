import { Block } from "./block";

/**
 * @classdesc - contains the attributes and methods for the miner service
 * @class MinerService
 */
export class MinerService {

    /**
     * @description - map of the mining jobs
     */
    private jobs: Map<string, Block> = new Map<string, Block>();

    /**
     * @constructor - initializes an object of this class
     */
    constructor() {
        console.log("MinerService");
    }

    /**
     * @description - processes a mining job that was requested from the blockchain node.
     * @param {any} job - job that was returned from the request to the blockchain node.
     */
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

    /**
     * @description - get the jobs map
     * @returns - map of the jobs
     */
    public getJobsMap(): Map<string, Block> {
        return this.jobs;
    }
}