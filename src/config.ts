/**
 * @classdesc - This class contains the configuration for the Node.
 * @class Config
 */
export class Config {
    /**
     * @description - default http server host
     */
    public defaultServerHost: string;
    /**
     * @description - default http server port
     */
    public defaultServerPort: number;

    /**
     * @description - Class constructor initializes the configuration attributes for the entire miner.
     * @constructor
     */
    constructor() {
        this.defaultServerHost = 'localhost';
        this.defaultServerPort = 5001;
    }
}