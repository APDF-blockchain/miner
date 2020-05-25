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

    //  /**
    //  * @description - default peer-to-pear listener host.
    //  */
    // public defaultP2pHost: string;

    // /**
    //  * @description - default peer-to-peer listener port
    //  */
    // public defaultP2pPort: number

    /**
     * @description - default block chain node host.
     */
    public defaultNodeHost: string;

    /**
     * @description - default block chain port.
     */
    public defaultNodePort: number;

    /**
     * @description - Class constructor initializes the configuration attributes for the entire miner.
     * @constructor
     */
    constructor() {
        this.defaultServerHost = 'localhost';
        // this.defaultP2pHost = 'localhost'
        this.defaultServerPort = 5001;
        // this.defaultP2pPort = 7001; 
        this.defaultNodeHost = 'localhost';
        this.defaultNodePort = 3001;
    }
}