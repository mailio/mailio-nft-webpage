import { createSlice } from "@reduxjs/toolkit";
import { AppThunk } from ".";

export interface MyWallet {
    address: string;
    name?: string,
    isActive?: boolean,
    ensNames?: (string | null)[] | undefined,
    network?: MyNetwork,
}

export interface MyNetwork {
    chainId: number,
    ensAddress?: string,
    name: string,
}

export interface WalletStore {
    wallets: MyWallet[];
}

const initState: WalletStore = {
    wallets: [],
};

const slice = createSlice({
    name: "wallet",
    initialState: initState,
    reducers: {
        upsertWallet(state: WalletStore, action: { payload: MyWallet }) {
            const wallet: MyWallet = action.payload;
            const foundIndex = state.wallets.findIndex((w) => w.address === wallet.address);
            if (foundIndex < 0) {
                state.wallets.push(wallet);
            } else {
                state.wallets[foundIndex] = wallet;
            }
        },
        updateWalletNetwork(state: WalletStore, action: { payload: { address: string, network: MyNetwork } }) {
            const network = action.payload.network;
            const address = action.payload.address;
            const foundIndex = state.wallets.findIndex((w) => w.address === address);
            if (foundIndex < 0) {
                return; // nothing to do
            }
            state.wallets[foundIndex].network = network;
        },
        disconnect(state: WalletStore) {
            // simply deletes cache
            state.wallets = [];
        },
    },
});

export const upsertWallet = (wallet: MyWallet): AppThunk => async (dispatch) => {
    dispatch(slice.actions.upsertWallet(wallet));
};

export const setWalletNetwork = (address: string, network: MyNetwork): AppThunk => async (dispatch) => {
    dispatch(slice.actions.updateWalletNetwork({ address, network }));
};

export const disconnectWallets = (): AppThunk => async (dispatch) => {
    dispatch(slice.actions.disconnect());
};

export const { reducer } = slice;