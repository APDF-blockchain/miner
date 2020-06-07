"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
/**
 * @classdesc - This class contains the configuration for the Miner.
 * @class Config
 */
class Config {
    /**
     * @description - Class constructor initializes the configuration attributes for the entire miner.
     * @constructor
     */
    constructor() {
        this.nodeUrl = 'https://awesome-blockchain-node.herokuapp.com';
        this.minerAddress = '5bc2ec2a690700159eea1087c0f41e032b687605c075ec7f192edee84051a7b6';
        this.microCoin = 1;
        this.milliCoin = 1000 * this.microCoin;
        this.oneCoin = 1000 * this.milliCoin;
        this.minFee = 10 * this.microCoin;
    }
}
exports.Config = Config;
//# sourceMappingURL=config.js.map