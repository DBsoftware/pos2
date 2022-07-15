import { Action, createReducer, on } from '@ngrx/store';
import { clearItemsCollection, loadAdBanner, loadItemsCollectionsSuccess, loadItemsShowcaseSuccess } from './items-collection.actions';


export const itemsCollectionFeatureKey = 'itemsCollection';

export interface State {
  collection: any
  showcase: any,
  adBanner: any
}

export const initialState: State = {
  collection: null,
  showcase: null,
  adBanner: null
};


export const reducer = createReducer(
  initialState,
  on(loadItemsCollectionsSuccess, (state, {data}) => ({...state,collection: data}) ),
  on(loadItemsShowcaseSuccess, (state, {data}) => ({...state,showcase: data}) ),
  on(loadAdBanner, (state, {data}) => ({...state,adBanner: data}) ),
  on(clearItemsCollection, (state) => ({...initialState}) ),
);

