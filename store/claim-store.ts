import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from ".";
import { ApiError, isApiError } from "../api/api";
import { nftServerApi } from "../api/nft-server-api";
import { Claim, ClaimPreview } from "../types/claim";

export interface ClaimStore {
    claims: Claim[];
    claimPreviews: ClaimPreview[],
    error?: ApiError,
}

const initState: ClaimStore = {
    claims: [],
    claimPreviews: [],
    error: undefined,
}

const slice = createSlice({
    name: "claim",
    initialState: initState,
    reducers: {
        listClaims(state: ClaimStore, action: PayloadAction<Claim[]>) {
            state.claims = action.payload;
            state.error = undefined;
        },
        listNfts(state: ClaimStore, action: PayloadAction<ClaimPreview[]>) {
            state.claimPreviews = action.payload;
            state.error = undefined;
        },
        setError(state: ClaimStore, action: PayloadAction<ApiError>) {
            state.error = action.payload;
        },
    },
});

export const listClaims = (): AppThunk => async (dispatch) => {
    nftServerApi.listClaims().then((claims) => {
        dispatch(slice.actions.listClaims(claims));
    }).catch(err => {
        console.error(err);
        dispatch(slice.actions.setError({ status: 500, message: err.message }));
    });
};

export const listNfts = (walletAddress: string, limit: number = 200): AppThunk => async (dispatch) => {
    nftServerApi.listNfts(walletAddress, limit).then((claimPreviews) => {
        dispatch(slice.actions.listNfts(claimPreviews));
    }).catch((err: ApiError | any) => {
        if (isApiError(err)) {
            dispatch(slice.actions.setError({ status: err.status, message: 'Transactions not yet processed by blockchain. Please refresh this site in a couple of minutes.' }));
        } else {
            dispatch(slice.actions.setError({ status: 500, message: err.message }));
        }
    });
};

export const { reducer } = slice;