/**
 * @classdesc - this is what is sent to the miner from the node from the GET request.
 * @class BlockCandidate
 */
export class BlockCandidate {
    /**
     * @description - index number of this block specified from the node.
     */
    public index: number;
    /**
     * @description - the number of transactions that included by the node.
     */
    public transactionsIncluded: number;
    /**
     * @description - the difficulty level for this block as required by the node.
     */
    public difficulty: number;
    /**
     * @description - the expected reward for a success mine as specified by the node.
     */
    public expectedReward: number;
    /**
     * @description - the address of this miner.
     */
    public rewardAddress: string;
    /**
     * @description - the blockDataHash that was calculated by the node after validating the transactions, which is the actual data.
     */
    public blockDataHash: string

    /**
     * @constructor
     */
    constructor() {

    }
}