// import { sha256, sha224 } from 'js-sha256';
//import sha256 from 'crypto-js/sha256';
import * as CryptoJS from 'crypto-js';
import { BlockCandidate } from './model/candidate-block';
import { SubmitBlock } from './model/submit-block';

/**
 * @classdesc - contains the attributes and methods for the miner service
 * @class MinerService
 */
export class MinerService {
    /**
     * The Mining Process: Trying Many Hashes
        o The miner changes the nonce + timestamp in a loop until it
            finds a SHA256 hash starting with d zeroes ( d == block
            difficulty
            o The Miner submits the mined block hash to the Node
            o 1 2 times per second the miner
                may take an updated block
                candidate from the Node
            o Miners may start several
                parallel threads to
                speed up the mining
        
        
        BlockDataHash: hex_number
        
        Nonce: number
        
        DateCreated : timestamp
        
        BlockHash: hex_number
        SHA256
    */

    /**
     * @description - map of the mining jobs
     */
    private jobs: Map<string, BlockCandidate> = new Map<string, BlockCandidate>();

    /**
     * @constructor - initializes an object of this class
     */
    constructor() {
        console.log("MinerService");
    }

    /**
     * @description - processes a mining job that was requested from the blockchain node.
     * @param {any} job - job that was returned from the request to the blockchain node.
     * @returns {BlockCandidate} minedBlock
     */
    public processMiningJob(job: any): SubmitBlock {
        //console.log('MinerService.processMiningJob(' + JSON.stringify(job) + '): called...');
        console.log('MinerService.processMiningJob(' + job + '): called...');
        let myBlock: BlockCandidate = new BlockCandidate();
        myBlock.blockDataHash = job.blockDataHash;
        myBlock.difficulty = job.difficulty;
        myBlock.expectedReward = job.expectedReward;
        myBlock.rewardAddress = job.rewardAddress;
        this.jobs.set(myBlock.blockDataHash, myBlock);
        let minedBlock = this.mineTheBlock(myBlock);
        return minedBlock;
    }

    private mineTheBlock(_candidateBlock: BlockCandidate): SubmitBlock {
        let minedBlock: SubmitBlock = new SubmitBlock();
        let done: boolean = false;
        // This allows for changes in difficulty and the number of zero to compare at the beginning of the calculated hash.
        let maxZeroString: string = "0".repeat(_candidateBlock.difficulty + 1);
        let minedBlockHash: string = '';
        let nonce: number = 0
        while (done === false) {
            console.log('MinerService.mineTheBloc(): nonce=', nonce);
            minedBlock.dateCreated = new Date();
            //minedBlockHash = sha256(
            minedBlockHash = CryptoJS.SHA256(
                _candidateBlock.blockDataHash +
                minedBlock.dateCreated.toISOString() +
                nonce).toString();
            console.log('MinerService.mineTheBloc(): minedBlockHash=', minedBlockHash);
            let _strStart: string = minedBlockHash.substr(0, _candidateBlock.difficulty);
            console.log('MinerService.mineTheBloc(): _strStart=', _strStart);
            if (_strStart === maxZeroString.substr(0, _candidateBlock.difficulty)) {
                done = true;
            } else {
                nonce++;
            }
        }
        minedBlock.nonce = nonce;
        minedBlock.blockHash = minedBlockHash;
        minedBlock.blockDataHash = _candidateBlock.blockDataHash;
        console.log('MinerService.mineTheBlock(): minedBlock='+JSON.stringify(minedBlock));
        return minedBlock;
    }

    /**
     * @description - get the jobs map
     * @returns - map of the jobs
     */
    public getJobsMap(): Map<string, BlockCandidate> {
        return this.jobs;
    }
}