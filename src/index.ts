import {Watcher, WatcherOpts, Token} from "./watch";

const addresses = [
    "lodestar.chainsafe.eth"
]

const tokens: Token[] = [
    {
        name: "DAI",
        address: "0x6b175474e89094c44da98b954eedeac495271d0f"
    },
    {
        name: "SAI",
        address: "0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359"
    }
]

const opts: WatcherOpts = {
    addresses,
    tokens
}

const n = new Watcher(opts);
n.update();
// (async () => {
//     await n.update()
//     n.log();
// })();