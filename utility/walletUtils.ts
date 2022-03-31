import { CoinbaseWallet } from "@web3-react/coinbase-wallet";
import { MetaMask } from "@web3-react/metamask";
import { Network } from "@web3-react/network";
import { Connector } from "@web3-react/types";
import { WalletConnect } from "@web3-react/walletconnect";
import { coinbaseWallet } from "../components/web3/connectors/coinbase";
import { metaMask } from "../components/web3/connectors/metamask";
import { walletConnect } from "../components/web3/connectors/wallet-connect";

export const appName: string | undefined = process.env.APP_NAME;

// based on current connector return connector name (wallet name)
export const getWeb3ConnectorName = (connector: Connector): string => {
    if (connector instanceof MetaMask) return 'MetaMask';
    if (connector instanceof WalletConnect) return 'WalletConnect';
    if (connector instanceof CoinbaseWallet) return 'Coinbase';
    if (connector instanceof Network) return 'Network';
    return 'Unknown';
};

// based on current connector return logo
export const getWeb3ConnectorLogo = (connector: Connector): string => {
    if (connector instanceof MetaMask) return '/images/meta-mask-fox.svg';
    if (connector instanceof WalletConnect) return '/images/wallet-connect-logo.svg';
    if (connector instanceof CoinbaseWallet) return '/images/coinbase-wallet-logo.svg';
    if (connector instanceof Network) return '';
    return '';
}

// converting an active wallets name to appropriate connector to disconnect from
export const walletNameToConnector = (walletName: string) => {
    switch (walletName) {
        case getWeb3ConnectorName(metaMask):
            return metaMask;
        case getWeb3ConnectorName(coinbaseWallet):
            return coinbaseWallet;
        case getWeb3ConnectorName(walletConnect):
            return walletConnect;
        default:
            return null;
    }
}


export const shortenWalletAddress = (address: string, length: number = 6) => {
    return address.slice(0, length) + '...' + address.slice(address.length - length);
};

export const shortenHash = (hash: string, length: number = 6) => {
    if (hash && hash.length > length) {
        return hash.slice(0, length) + '...';
    }
    return hash;
};