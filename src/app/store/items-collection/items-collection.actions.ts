import { createAction, props } from '@ngrx/store';

export const loadItemsCollections = createAction(
  '[ItemsCollection] Load ItemsCollections',
  props<{ data: any }>()
);
export const selectItemFromCollection = createAction(
  '[ItemsCollection] Load selectItemFromCollection',
  props<{ data: any }>()
);

export const loadItemsCollectionsSuccess = createAction(
  '[ItemsCollection] Load ItemsCollections Success',
  props<{ data: any }>()
);

export const loadItemsCollectionsFailure = createAction(
  '[ItemsCollection] Load ItemsCollections Failure',
  props<{ error: any }>()
);
export const clearItemsCollection = createAction(
  '[ItemsCollection] clearItemsCollection Failure',
);

export const loadItemsShowcaseSuccess = createAction(
  '[ItemsCollection] Load showcase Success',
  props<{ data: any }>()
);

export const loadAdBanner = createAction(
  '[User] Load loadAdBanner Auxiliars',
  props<{ data: any }>()
);
