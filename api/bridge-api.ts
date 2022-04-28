import API from "./api";
import { BridgeBalance } from "../types/bridge";


class BridgeApi {

    getBridgeBalance(): Promise<BridgeBalance> {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await API.get<BridgeBalance>('/v1/bridge/balance');

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

}

export const bridgeApi = new BridgeApi();