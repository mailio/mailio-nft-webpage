export interface ClaimKeyword {
    word: string;
}

export interface Claim {
    walletAddress: string,
    recaptcha_token?: string,
    mailioAddress?: string,
    signature: string,
    catalogId: string,
    gasPrice?: number,
    tokenUri?: string,
    txHash?: string,
    keywords?: ClaimKeyword[],
    created?: number,
}

export interface ClaimPreview extends Claim {
    tokenId?: number,
    txStatus?: number, // 1 = success, 0 = failed
}