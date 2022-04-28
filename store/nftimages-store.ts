import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from ".";
import { nftImageApi } from "../api/nft-image-api";
import { NftImage } from "../types/nft-image";

export interface NftImagesStore {
    image: NftImage;
}

const initState: NftImagesStore = {
    image: {},
}

const slice = createSlice({
    name: "nftimages",
    initialState: initState,
    reducers: {
        listImages(state: NftImagesStore, action: PayloadAction<NftImage>) {
            state.image = action.payload;
        },
    },
});

export const listImages = (): AppThunk => async (dispatch) => {
    nftImageApi.listImages().then((img) => {
        dispatch(slice.actions.listImages(img));
    }).catch(err => {
        console.error(err);
    });
};

export const deleteImage = (hash: string): AppThunk => async (dispatch) => {
    nftImageApi.deleteImage(hash).then((imgResponse) => {
        nftImageApi.listImages().then((img) => {
            dispatch(slice.actions.listImages(img));
        }).catch(err => {
            console.error(err);
        });
    }).catch(err => {
        console.error(err);
    });
};

export const { reducer } = slice;