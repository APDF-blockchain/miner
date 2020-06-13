/**
 * @classdesc - This class contains the configuration for the Miner.
 * @class Config
 */
export class Config {
        /**
     * Coins and Rewards
        o Coins are 64 bit integers (no real numbers!)
            o 1 coin = 1 000 milli coins = 1 000 000 micro coins
        o All transfers, fees, block awards are defined in micro coins
        o The block reward (per mined block) is static
            o 5,000,000 micro coins
        o The minimum transaction fee (to avoid spam) is
            o 10 micro coins
     */

    /**
     * @description - 1 coin = 1000 milli-coins = 1,000,000 micro-coins
     */
    public oneCoin: number;
    /**
     * @description - 1 milli-coin = 1000 micro-coins
     */
    public milliCoin: number;
    /**
     * @description - 1 micro-coin
     */
    public microCoin: number;

    /**
     * @description - minimum fee = 10 micro-coin
     */
    public minFee: number;

    /**
     * @description - default node url http://localhost:3001
     */
    public nodeUrl: string;

    /**
     * @description - miner address that we set, possibly the metamask account address. Currently 28Fcf7997E56f1Fadd4FA39fD834e5B96cb13b2B
     */
    public minerAddress: string;
    /**
     * @description - Class constructor initializes the configuration attributes for the entire miner.
     * @constructor
     */
    constructor() {
        // this.nodeUrl = 'https://awesome-blockchain-node.herokuapp.com';
        this.nodeUrl = 'http://localhost:3001';
        this.minerAddress = '5bc2ec2a690700159eea1087c0f41e032b687605c075ec7f192edee84051a7b6';
        this.microCoin = 1;
        this.milliCoin = 1000 * this.microCoin;
        this.oneCoin = 1000 * this.milliCoin;
        this.minFee = 10 * this.microCoin;
    }
}