import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as FromitemsCollectionOrder from './items-collection.reducer'

export const selectitemsCollectionState =
    createFeatureSelector<FromitemsCollectionOrder.State>("itemsCollection");



    export const selectCollection = createSelector(
        selectitemsCollectionState,
        (st) => st.collection
    );
    export const selectCategory = createSelector(
        selectitemsCollectionState,
        (st) => !!st.collection ? st.collection[0] : null
    );
    export const selectShowcase = createSelector(
        selectitemsCollectionState,
        (st) => st.showcase
    );
    export const selectBanner = createSelector(
        selectitemsCollectionState,
        (st) => st.adBanner
    );
    export const selectRow = createSelector(
        selectCollection,
        (st, props) => !!st ? st.filter(it => it.category_id.includes(props.id))[0]: st
    );
