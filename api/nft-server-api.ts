import { Catalog } from "../types/catalog";
import { Claim, ClaimPreview } from "../types/claim";
import API from "./api";

class NftServerApi {

    listCatalogs(): Promise<Catalog[]> {
        return new Promise(async (resolve, reject) => {

            try {
                const response = await API.get<Catalog[]>(`/v1/catalog?noCache=${new Date().getTime()}`);

                if (response.status !== 200) {
                    reject(new Error('failed to retrieve catalogs'));
                    return;
                }
                resolve(response.data);
            } catch (err) {
                console.error('[API]: ', err);
                reject(new Error('failed to retrieve catalogs'));
            }
        });
    }

    putCatalog(catalog: Catalog): Promise<Catalog> {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await API.post<Catalog>('/v1/catalog', catalog);

                if (response.status !== 200) {
                    reject(new Error('failed to retrieve catalogs'));
                    return;
                }
                resolve(response.data);
            } catch (err) {
                console.error('[API]: ', err);
                reject(new Error('failed to retrieve catalogs'));
            }
        });
    };

    getCatalog(catalogId: string): Promise<Catalog> {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await API.get<Catalog>(`/v1/catalog/${catalogId}`);

                if (response.status !== 200) {
                    reject(new Error('failed to retrieve catalogs'));
                    return;
                }
                resolve(response.data);
            } catch (err) {
                console.error('[API]: ', err);
                reject(new Error('failed to retrieve catalogs'));
            }
        });
    }

    listClaims(): Promise<Claim[]> {
        return new Promise(async (resolve, reject) => {

            try {
                const response = await API.get<Claim[]>('/v1/claim');

                if (response.status !== 200) {
                    reject(new Error('failed to retrieve claims'));
                    return;
                }
                resolve(response.data);
            } catch (err) {
                console.error('[API]: ', err);
                reject(new Error('failed to retrieve claims'));
            }
        });
    }

    getSignaturePayload(walletAdress: string, catalogId: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await API.get<any>(`/v1/claim/${walletAdress}/payload/${catalogId}`);
                if (response.status !== 200) {
                    reject(new Error('failed to retrieve eip-712 signature payload'));
                    return;
                }
                resolve(response.data);
            } catch (err: any) {
                if (err.response && err.response.data) {
                    reject(new Error(err.response.data['message']));
                    return;
                }
                console.error('[API]: ', err);
                reject(new Error('failed to retrieve eip-712 signature payload'));
            }
        });
    }

    claim(claim: Claim): Promise<Claim> {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await API.post<Claim>('/v1/claim', claim);
                resolve(response.data);
            } catch (err: any) {
                if (err.response && err.response.data) {
                    reject(new Error(err.response.data['message']));
                    return;
                }
                console.error('[API]: ', err);
                reject(new Error("failed to claim the catalog"));
            }
        });
    };

    listNfts(walletAddress: string, limit: number = 200): Promise<ClaimPreview[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await API.get<ClaimPreview[]>(`/v1/user/claims/${walletAddress}?limit=${limit}`);
                resolve(response.data);
            } catch (err: any) {
                if (err.response && err.response.data) {
                    reject(new Error(err.response.data['message']));
                    return;
                }
                console.error('[API]: ', err);
                reject(new Error("failed to list nfts"));
            }
        });
    };

}

export const nftServerApi = new NftServerApi();