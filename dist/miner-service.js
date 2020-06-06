"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinerService = void 0;
// import { sha256, sha224 } from 'js-sha256';
//import sha256 from 'crypto-js/sha256';
const CryptoJS = __importStar(require("crypto-js"));
const candidate_block_1 = require("./model/candidate-block");
const submit_block_1 = require("./model/submit-block");
/**
 * @classdesc - contains the attributes and methods for the miner service
 * @class MinerService
 */
class MinerService {
    /**
     * @constructor - initializes an object of this class
     */
    constructor() {
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
        this.jobs = new Map();
        console.log("MinerService");
    }
    /**
     * @description - processes a mining job that was requested from the blockchain node.
     * @param {any} job - job that was returned from the request to the blockchain node.
     * @returns {BlockCandidate} minedBlock
     */
    processMiningJob(job) {
        //console.log('MinerService.processMiningJob(' + JSON.stringify(job) + '): called...');
        console.log('MinerService.processMiningJob(' + job + '): called...');
        let myBlock = new candidate_block_1.BlockCandidate();
        myBlock.blockDataHash = job.blockDataHash;
        myBlock.difficulty = job.difficulty;
        myBlock.expectedReward = job.expectedReward;
        myBlock.rewardAddress = job.rewardAddress;
        this.jobs.set(myBlock.blockDataHash, myBlock);
        let minedBlock = this.mineTheBlock(myBlock);
        return minedBlock;
    }
    mineTheBlock(_candidateBlock) {
        let minedBlock = new submit_block_1.SubmitBlock();
        let done = false;
        // This allows for changes in difficulty and the number of zero to compare at the beginning of the calculated hash.
        let maxZeroString = "0".repeat(_candidateBlock.difficulty + 1);
        let minedBlockHash = '';
        let nonce = 0;
        while (done === false) {
            console.log('MinerService.mineTheBloc(): nonce=', nonce);
            minedBlock.dateCreated = new Date();
            //minedBlockHash = sha256(
            minedBlockHash = CryptoJS.SHA256(_candidateBlock.blockDataHash +
                minedBlock.dateCreated.toISOString() +
                nonce).toString();
            console.log('MinerService.mineTheBloc(): minedBlockHash=', minedBlockHash);
            let _strStart = minedBlockHash.substr(0, _candidateBlock.difficulty);
            console.log('MinerService.mineTheBloc(): _strStart=', _strStart);
            if (_strStart === maxZeroString.substr(0, _candidateBlock.difficulty)) {
                done = true;
            }
            else {
                nonce++;
            }
        }
        minedBlock.nonce = nonce;
        minedBlock.blockHash = minedBlockHash;
        minedBlock.blockDataHash = _candidateBlock.blockDataHash;
        console.log('MinerService.mineTheBlock(): minedBlock=' + JSON.stringify(minedBlock));
        return minedBlock;
    }
    /**
     * @description - get the jobs map
     * @returns - map of the jobs
     */
    getJobsMap() {
        return this.jobs;
    }
}
exports.MinerService = MinerService;
//# sourceMappingURL=miner-service.js.map