export interface Catalog {
    id?: string,
    name: string,
    type: string,
    description: string,
    contentLink: string,
    imageLink?: string,
    videoLink?: string,
    nftTokensUsed: number,
    keywords: string,
    created?: number,
    modified?: number,
}