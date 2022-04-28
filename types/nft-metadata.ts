export interface NftMetadata {
    name: string,
    image: string,
    description: string,
    external_url?: string,
    attributes: NftMetadataAttribute[],
}

export interface NftMetadataAttribute {
    display_type: string,
    trait_type: string,
    value: number,
}