import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { AppThunk } from ".";
import { nftServerApi } from "../api/nft-server-api";
import { Catalog } from "../types/catalog";

export interface CatalogStore {
    catalog: Catalog[];
}

const initState: CatalogStore = {
    catalog: [],
}

const slice = createSlice({
    name: "catalog",
    initialState: initState,
    reducers: {
        listCatalogs(state: CatalogStore, action: PayloadAction<Catalog[]>) {
            state.catalog = action.payload;
        },
        putCatalog(state: CatalogStore, action: PayloadAction<Catalog>) {
            const catIndex = state.catalog.findIndex((catalog) => { return catalog.id === action.payload.id; });
            if (catIndex < 0) {
                state.catalog.push(action.payload);
            } else {
                state.catalog[catIndex] = action.payload;
            }
        },
    },


});

export const listCatalogs = (): AppThunk => async (dispatch) => {
    nftServerApi.listCatalogs().then((catalogs) => {
        dispatch(slice.actions.listCatalogs(catalogs));
    }).catch(err => {
        console.error(err);
    });
};

export const putCatalog = (catalog: Catalog): AppThunk => async (dispatch): Promise<void> => {
    nftServerApi.putCatalog(catalog).then((catalog) => {
        dispatch(slice.actions.putCatalog(catalog));
    }).catch(err => {
        console.error(err);
        throw err;
    });
};

export const getCatalog = (id: string): AppThunk => async (dispatch): Promise<void> => {
    nftServerApi.getCatalog(id).then((catalog) => {
        dispatch(slice.actions.putCatalog(catalog));
    }).catch(err => {
        console.error(err);
        throw err;
    });
};

export const { reducer } = slice;