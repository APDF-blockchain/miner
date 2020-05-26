/**
 * @classdesc - This class contains the configuration for the Miner.
 * @class Config
 */
export class Config {

    /**
     * @description - default node url.
     */
    public nodeUrl: string;
    /**
     * @description - Class constructor initializes the configuration attributes for the entire miner.
     * @constructor
     */
    constructor() {
        this.nodeUrl = 'http://localhost:3001';
    }
}