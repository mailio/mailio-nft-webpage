export interface NftImage {
    Keys?: { [key: string]: string },
    PinLsObject?: NftPinLsObject,
}

export interface NftPinLsObject {
    Cid?: string,
    Type?: string,
}

export interface ImageUploadResponse {
    hash?: string,
    size?: string,
    name?: string,
}

export interface ImageDeleteResponse {
    pins?: string[]
}