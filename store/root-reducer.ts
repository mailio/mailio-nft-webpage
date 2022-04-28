import { combineReducers } from '@reduxjs/toolkit';
import { reducer as catalogReducer } from './catalog-store';
import { reducer as claimReducer } from './claim-store';
import { reducer as nftImagesReducer } from './nftimages-store';

export const rootReducer = combineReducers({
    catalog: catalogReducer,
    claim: claimReducer,
    nftimages: nftImagesReducer,
});
