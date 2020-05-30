import { sha256, sha224 } from 'js-sha256';
import { Block } from "./block";
import { BlockCandidate } from './model/block-candidate';
import { GetMiningJobRequest } from './model/get-mining-job-request';
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
    private jobs: Map<string, GetMiningJobRequest> = new Map<string, GetMiningJobRequest>();

    /**
     * @constructor - initializes an object of this class
     */
    constructor() {
        console.log("MinerService");
    }

    /**
     * @description - processes a mining job that was requested from the blockchain node.
     * @param {any} job - job that was returned from the request to the blockchain node.
     * @returns {GetMiningJobRequest} minedBlock
     */
    public processMiningJob(job: any): SubmitBlock {
        //console.log('MinerService.processMiningJob(' + JSON.stringify(job) + '): called...');
        console.log('MinerService.processMiningJob(' + job + '): called...');
        let myBlock: GetMiningJobRequest = new GetMiningJobRequest();
        myBlock.blockDataHash = job.blockDataHash;
        myBlock.difficulty = job.difficulty;
        myBlock.index = job.index;
        myBlock.expectedReward = job.expectedReward;
        myBlock.rewardAddress = job.rewardAddress;
        this.jobs.set(myBlock.blockDataHash, myBlock);
        let minedBlock = this.mineTheBlock(myBlock);
        return minedBlock;
    }

    private mineTheBlock(_block: GetMiningJobRequest): SubmitBlock {
        let minedBlock: SubmitBlock = new SubmitBlock();
        let blockCandidate: BlockCandidate = new BlockCandidate();
        let done: boolean = false;
        // This allows for changes in difficulty and the number of zero to compare at the beginning of the calculated hash.
        let maxZeroString: string = "0".repeat(_block.difficulty + 1); 
        let minedBlockHash: string = '';
        let nonce: number = 0
        blockCandidate.blockDataHash = _block.blockDataHash;
        blockCandidate.dateCreated = new Date();
        blockCandidate.nonce = nonce;
        while (done === false) {
            console.log('MinerService.mineTheBloc(): nonce=', nonce);
            blockCandidate.nonce = nonce;
            //minedBlockHash = sha256(JSON.stringify(blockCandidate));
            minedBlockHash = sha256(
                _block.index + 
                _block.previousBlockHash + 
                _block.timestamp + 
                _block.transactions +
                _block.difficulty + 
                nonce.toString());
            console.log('MinerService.mineTheBloc(): minedBlockHash=', minedBlockHash);
            let _strStart: string = minedBlockHash.substr(0, _block.difficulty);
            console.log('MinerService.mineTheBloc(): _strStart=', _strStart);
            if (_strStart === maxZeroString.substr(0, _block.difficulty)) {
                done = true;
            } else {
                nonce++;
            }
        }
        minedBlock.nonce = blockCandidate.nonce;
        minedBlock.blockHash = minedBlockHash;
        minedBlock.dateCreated = new Date();
        minedBlock.blockDataHash = blockCandidate.blockDataHash;
        minedBlock.timestamp = _block.timestamp;
        minedBlock.transactions = _block.transactions;
        return minedBlock;
    }

    // private mineTheBlockWrongIthink(_block: Block): Block {
    //     let minedBlock: Block;
    //     // Deal with the transactions. Such as set the block index and the trans success = true.
    //     for (let i = 0; i < _block.transactions.length; i++) {
    //         _block.transactions[i].tranferSuccessful = true;
    //         _block.transactions[i].minedInBlockIndex = _block.index;
    //     }
    //     let done: boolean = false;
    //     //let maxZeroString: string = '00000000000000000000000000000000000000000000000000'; // 50 zeros
    //     // This allows for changes in difficulty and the number of zero to compare at the beginning of the calculated hash.
    //     let maxZeroString: string = "0".repeat(_block.difficulty + 1); 
    //     let minedBlockHash: string = '';
    //     let nonce: number = _block.nonce;
    //     while (done === false) {
    //         console.log('nonce=', nonce);
    //         _block.nonce = nonce;
    //         minedBlockHash = sha256(JSON.stringify(_block));
    //         console.log('minedBlockHash=', minedBlockHash);
    //         let _strStart: string = minedBlockHash.substr(0, _block.difficulty);
    //         console.log('_strStart=', _strStart);
    //         if (_strStart === maxZeroString.substr(0, _block.difficulty)) {
    //             done = true;
    //         } else {
    //             nonce++;
    //         }
    //     }
    //     _block.nonce = nonce;
    //     _block.blockHash = minedBlockHash;
    //     _block.dateCreated = new Date();
    //     minedBlock = _block;
    //     return minedBlock;
    // }

    /**
     * @description - get the jobs map
     * @returns - map of the jobs
     */
    public getJobsMap(): Map<string, GetMiningJobRequest> {
        return this.jobs;
    }
}