/**
 * @classdesc - this class is used as the model to send back to the node.
 * @class SubmitBlock
 */
export class SubmitBlock {
    /**
     * @description - the block data hash that was calculated on the node verifying the data/transactions.
     */
    public blockDataHash: string;
    /**
     * @description - this gets updated for every interation of the mining loop.
     */
    public dateCreated: Date;
    /**
     * @description - this value is incremented by 1 for every iteration of the mining loop.
     */
    public nonce: number;
    /**
     * @description - this is the resulting hash from the mining loop.
     */
    public blockHash: string;

    /**
     * @constructor
     */
    constructor() {

    }
}