
export const DEFAULT_CHAINS: { [key: string]: any } = {
    "137": {
        "rpcUrls": [
            "https://polygon-rpc.com/",
            "https://rpc-mainnet.matic.network",
            "https://matic-mainnet.chainstacklabs.com",
            "https://rpc-mainnet.maticvigil.com",
            "https://rpc-mainnet.matic.quiknode.pro",
            "https://matic-mainnet-full-rpc.bwarelabs.com"
        ],
        "nativeCurrency": {
            "name": "MATIC",
            "symbol": "MATIC",
            "decimals": 18
        },
        "chainId": `0x${Number(137).toString(16)}`,
        "chainName": "Polygon Mainnet",
    },
    "80001": {
        "rpcUrls": [
            "https://matic-mumbai.chainstacklabs.com",
            "https://rpc-mumbai.maticvigil.com",
            "https://matic-testnet-archive-rpc.bwarelabs.com"
        ],
        "nativeCurrency": {
            "name": "MATIC",
            "symbol": "MATIC",
            "decimals": 18
        },
        "chainId": `0x${Number(80001).toString(16)}`,
        "chainName": "Mumbai Testnet"
    },
};