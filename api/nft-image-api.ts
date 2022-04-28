import { ImageDeleteResponse, ImageUploadResponse, NftImage } from "../types/nft-image";
import API from "./api";

class NftImageApi {

    listImages(): Promise<NftImage> {
        return new Promise(async (resolve, reject) => {

            try {
                const response = await API.get<NftImage>('/v1/nftimage/list');

                if (response.status !== 200) {
                    reject(new Error('failed to retrieve nft images'));
                    return;
                }
                resolve(response.data);
            } catch (err) {
                console.error('[API]: ', err);
                reject(new Error('failed to retrieve nft images'));
            }
        });
    }

    uploadImage(image: File): Promise<ImageUploadResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                var formdata = new FormData();
                formdata.append('image', image);
                await API.post<ImageUploadResponse>('/v1/nftimage/upload', formdata, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                });
            } catch (err) {
                console.error('[API]: ', err);
                reject(new Error('failed to upload nft image' + image.name));
            }
        });
    }

    deleteImage(hash: string): Promise<ImageDeleteResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await API.delete<ImageDeleteResponse>(`/v1/nftimage/${hash}`);
                if (response.status !== 200) {
                    reject(new Error('failed to delete nft images'));
                    return;
                }
                resolve(response.data);
            } catch (err) {
                console.error('[API]: ', err);
                reject(new Error('failed to delete nft image'));
            }
        });
    }

}

export const nftImageApi = new NftImageApi();