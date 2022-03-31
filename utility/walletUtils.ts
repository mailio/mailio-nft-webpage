export const appName: string | undefined = process.env.APP_NAME;

export interface WalletDisplay {
    name: string;
    caption?: string;
    image: string;
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