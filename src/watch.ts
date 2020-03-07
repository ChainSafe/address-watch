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
    balance?: string;
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

    async update() {
        let provider = ethers.getDefaultProvider();
        for (const userAddress of this.addresses) {
            const ether = (await provider.getBalance(userAddress)).toString();
            // const ether = await provider.getBalance(userAddress)
            const tokens = [] as Token[];

            for (const token of this.tokens) {
                let contract = new ethers.Contract(token.address, erc20Abi, provider);
                const balance = await contract.balanceOf(userAddress);
                token.balance = ethers.utils.formatEther(balance);
                tokens.push(token)
            }
            this.balances.set(userAddress, {ether: ethers.utils.formatEther(ether), tokens})
        }
        this.log();
    }

    log() {
        clear();
        const headers = ["Address", "ETH"];
        this.tokens.forEach(token => { headers.push(token.name) });
        const table = new Table({ head: headers });
        this.addresses.forEach(address => {
           const balances = this.balances.get(address);
           const tokenBalances = balances.tokens.map(token => { return token.balance });
           console.log({tokenBalances})
           table.push([
               address, balances.ether, ...tokenBalances
           ])
        })
        console.log(table.toString());
    }
}