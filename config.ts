import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import WalletConnectProvider from '@walletconnect/web3-provider';

export const ETHERSCAN_URL = 'https://mumbai.polygonscan.com';
export const NETWORK_COIN_SYMBOL = 'MATIC';
export const DEFAULT_CHAIN_ID = 80001;
export const APP_NAME = "dApp Started Kit"
export const DEFAULT_APP_THEME: 'light' | 'dark' = 'light'; // light, dark

// list of providers for web3 modal
export const web3ProviderOptions = {
    walletconnect: {
        display: {
            name: "Mobile"
        },
        package: WalletConnectProvider,
        options: {
            infuraId: "INFURA_ID" // required
        }
    },
    walletlink: {
        package: CoinbaseWalletSDK,
        options: {
            appName: APP_NAME,
            infuraId: "INFURA_ID" // required
        },
    },
};

export const DEFAULT_CHAINS = {
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