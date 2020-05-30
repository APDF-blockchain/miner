import { Transaction } from "./transaction";

export class SubmitBlock {
    public blockDataHash: string;
    public dateCreated: Date;
    public timestamp: number;
    public nonce: number;
    public blockHash: string;
    public transactions: Transaction[];

    constructor() {

    }
}