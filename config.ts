import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import WalletConnectProvider from '@walletconnect/web3-provider';

export const ETHERSCAN_URL = process.env.NEXT_PUBLIC_ETHERCAN_URL;
export const NETWORK_COIN_SYMBOL = process.env.NEXT_PUBLIC_NETWORK_COIN_SYMBOL;
export const DEFAULT_CHAIN_ID = parseInt(process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID!); // required
export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME;
export const DEFAULT_APP_THEME: 'light' | 'dark' = process.env.NEXT_PUBLIC_DEFAULT_APP_THEME === "light" ? "light" : "dark";
export const NFT_SERVER_URL = process.env.NEXT_PUBLIC_NFT_SERVER_URL;
export const IPFS_GATEWAY_URL = process.env.NEXT_PUBLIC_IPFS_GATEWAY_URL;
export const INFURA_ID = process.env.NEXT_PUBLIC_INFURA_ID;
export const FINGERPRINT_ID = process.env.NEXT_PUBLIC_FINGERPRINT_ID;


// list of providers for web3 modal
export const web3ProviderOptions = {
    walletconnect: {
        display: {
            name: "WalletConnect"
        },
        package: WalletConnectProvider,
        chainId: DEFAULT_CHAIN_ID,
        options: {
            rpc: {
                137: 'https://polygon-rpc.com',
                1337: 'http://localhost:8545',
                80001: 'https://matic-mumbai.chainstacklabs.com',
            },
            infuraId: INFURA_ID // required but we dont use it in frontend (security issue?)
        }
    },
    walletlink: {
        package: CoinbaseWalletSDK,
        options: {
            appName: APP_NAME,
            infuraId: INFURA_ID, // required but we dont use it in frontend (security issue?)
            chainId: DEFAULT_CHAIN_ID,
        },
    },
};