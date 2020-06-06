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
        this.nodeUrl = 'http://localhost:3001';
        this.minerAddress = '28Fcf7997E56f1Fadd4FA39fD834e5B96cb13b2B';
        this.microCoin = 1;
        this.milliCoin = 1000 * this.microCoin;
        this.oneCoin = 1000 * this.milliCoin;
        this.minFee = 10 * this.microCoin;
    }
}
exports.Config = Config;
//# sourceMappingURL=config.js.map