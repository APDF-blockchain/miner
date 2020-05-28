import { sha256, sha224 } from 'js-sha256';
import { Block } from "./block";
import { BlockCandidate } from './model/block-candidate';

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
     * @returns {Block} minedBlock
     */
    public processMiningJob(job: any): Block {
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
        myBlock.transactions = job.transactions;
        this.jobs.set(myBlock.blockDataHash, myBlock);
        let minedBlock = this.mineTheBlock(myBlock);
        return minedBlock;
    }

    private mineTheBlock(_block: Block): Block {
        let minedBlock: Block;
        let blockCandidate: BlockCandidate = new BlockCandidate();
        // Deal with the transactions. Such as set the block index and the trans success = true.
        for (let i = 0; i < _block.transactions.length; i++) {
            _block.transactions[i].tranferSuccessful = true;
            _block.transactions[i].minedInBlockIndex = _block.index;
        }
        let done: boolean = false;
        // This allows for changes in difficulty and the number of zero to compare at the beginning of the calculated hash.
        let maxZeroString: string = "0".repeat(_block.difficulty + 1); 
        let minedBlockHash: string = '';
        let nonce: number = _block.nonce;
        blockCandidate.blockDataHash = _block.blockDataHash;
        blockCandidate.dateCreated = new Date();
        blockCandidate.nonce = nonce;
        while (done === false) {
            console.log('nonce=', nonce);
            blockCandidate.nonce = nonce;
            minedBlockHash = sha256(JSON.stringify(blockCandidate));
            console.log('minedBlockHash=', minedBlockHash);
            let _strStart: string = minedBlockHash.substr(0, _block.difficulty);
            console.log('_strStart=', _strStart);
            if (_strStart === maxZeroString.substr(0, _block.difficulty)) {
                done = true;
            } else {
                nonce++;
            }
        }
        _block.nonce = nonce;
        _block.blockHash = minedBlockHash;
        _block.dateCreated = new Date();
        minedBlock = _block;
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
    public getJobsMap(): Map<string, Block> {
        return this.jobs;
    }
}