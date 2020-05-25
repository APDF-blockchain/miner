import {Client} from 'node-rest-client';
export class HttpService {
    public client: Client;
    constructor() {
        this.client = new Client();
    }
}