import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from ".";
import { nftServerApi } from "../api/nft-server-api";
import { Claim, ClaimPreview } from "../types/claim";

export interface ClaimStore {
    claims: Claim[];
    claimPreviews: ClaimPreview[],
}

const initState: ClaimStore = {
    claims: [],
    claimPreviews: [],
}

const slice = createSlice({
    name: "claim",
    initialState: initState,
    reducers: {
        listClaims(state: ClaimStore, action: PayloadAction<Claim[]>) {
            state.claims = action.payload;
        },
        listNfts(state: ClaimStore, action: PayloadAction<ClaimPreview[]>) {
            state.claimPreviews = action.payload;
        },
    },
});

export const listClaims = (): AppThunk => async (dispatch) => {
    nftServerApi.listClaims().then((claims) => {
        dispatch(slice.actions.listClaims(claims));
    }).catch(err => {
        console.error(err);
    });
};

export const listNfts = (walletAddress: string, limit: number = 200): AppThunk => async (dispatch) => {
    nftServerApi.listNfts(walletAddress, limit).then((claimPreviews) => {
        dispatch(slice.actions.listNfts(claimPreviews));
    }).catch((err) => {
        console.error(err);
    });
};

export const { reducer } = slice;