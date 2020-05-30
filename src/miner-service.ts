// import { sha256, sha224 } from 'js-sha256';
//import sha256 from 'crypto-js/sha256';
import * as CryptoJS from 'crypto-js';
import { Block } from "./block";
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
        myBlock.index = job.index;
        myBlock.expectedReward = job.expectedReward;
        myBlock.rewardAddress = job.rewardAddress;
        myBlock.transactions = job.transactions;
        myBlock.timestamp = job.timestamp;
        myBlock.transactionsIncluded = job.transactionsIncluded;
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
            //CryptoJS.SHA256(index + previousHash + timestamp + data + difficulty + nonce).toString();
            //minedBlockHash = sha256(
            minedBlockHash = CryptoJS.SHA256(
                _candidateBlock.index +
                _candidateBlock.previousBlockHash +
                _candidateBlock.timestamp +
                _candidateBlock.transactions +
                _candidateBlock.difficulty +
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
        minedBlock.dateCreated = new Date();
        minedBlock.blockDataHash = _candidateBlock.blockDataHash;
        minedBlock.timestamp = _candidateBlock.timestamp;
        // Go through the transactions and set the minedBlockIndex and the tranferSuccessful
        for (let i = 0; i < _candidateBlock.transactions.length; i++) {
            _candidateBlock.transactions[i].minedInBlockIndex = _candidateBlock.index;
            _candidateBlock.transactions[i].tranferSuccessful = true;
        }
        minedBlock.transactions = _candidateBlock.transactions;
        console.log('MinerService.mineTheBlock(): minedBlock='+JSON.stringify(minedBlock));
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
    public getJobsMap(): Map<string, BlockCandidate> {
        return this.jobs;
    }
}