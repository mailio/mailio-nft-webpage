// API key for Ethereum node

import { chain, defaultChains, InjectedConnector } from "wagmi";
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { WalletLinkConnector } from 'wagmi/connectors/walletLink';

// Two popular services are Infura (infura.io) and Alchemy (alchemy.com)
export const infuraId = process.env.INFURA_ID;
export const appName: string | undefined = process.env.APP_NAME;

// Chains for connectors to support
export const chains = defaultChains;

interface WagmiConfig {
    chainId?: number;
}

export interface WalletDisplay {
    name: string;
    caption?: string;
    image: string;
}

export const walltConnectors = (config: WagmiConfig) => {
    const rpcUrl = chains.find((x) => x.id === config.chainId)?.rpcUrls?.[0] ?? chain.mainnet.rpcUrls[0];
    return [
        new InjectedConnector({
            chains,
            options: { shimDisconnect: true },
        }),
        new WalletConnectConnector({
            options: {
                infuraId,
                qrcode: true,
            },
        }),
        new WalletLinkConnector({
            options: {
                appName: appName ? appName : 'Unknown app',
                jsonRpcUrl: `${rpcUrl}/${infuraId}`,
            },
        }),
    ]
}

export const displayWalletConnectors: WalletDisplay[] = [
    {
        name: 'MetaMask',
        caption: 'Connect Your MetaMask Wallet',
        image: '/images/meta-mask-fox.svg',
    },
    {
        name: 'WalletConnect',
        caption: 'Connect with Your Wallet Connect',
        image: '/images/wallet-connect-logo.svg',
    },
    {
        name: 'Coinbase Wallet',
        caption: 'Connect with Your Coinbase Wallet',
        image: '/images/coinbase-wallet-logo.svg',
    }
];

export const shortenWalletAddress = (address: string, length: number = 6) => {
    return address.slice(0, length) + '...' + address.slice(address.length - length);
};

export const shortenHash = (hash: string, length: number = 6) => {
    if (hash && hash.length > length) {
        return hash.slice(0, length) + '...';
    }
    return hash;
};