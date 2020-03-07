import { ethers } from "ethers";
import clear from "clear";
import Table from "cli-table";

import { erc20Abi } from "./abi/erc20";

export interface WatcherOpts {
    // Array of addresses to watch
    addresses: string[];
    // Array of token addresses
    tokens: Token[];
}

interface Balances {
    ether: string;
    tokens: Token[];
}

export interface Token {
    // Token name
    name: string;
    // Address of the token
    address: string;
    // Todo perhaps change this
    amount?: string;
}

export class Watcher {
    public addresses: string[];
    public tokens: Token[];
    public balances: Map<string, Balances>;

    constructor(opts: WatcherOpts) {
        this.addresses = opts.addresses;
        this.tokens = opts.tokens;
        this.balances = new Map();
    }

    async start() {
        let provider = ethers.getDefaultProvider();
        this.addresses.forEach(async userAddress => {
            let tokens = [];
            this.tokens.forEach(async token => {
                let contract = new ethers.Contract(token.address, erc20Abi, provider);
                const balance = await contract.balanceOf(userAddress);
                tokens[] = ;
            })
        })
        this.log()
    }

    registerToken() {

    }

    log() {
        clear();
        const headers = ["Address", "ETH"];
        this.tokens.forEach(token => { headers.push(token.name) });
        const table = new Table({ head: headers });
        table.push(
            ['First value', 'Second value']
            , ['First value', 'Second value']
        );
        console.log(table.toString());
    }
}