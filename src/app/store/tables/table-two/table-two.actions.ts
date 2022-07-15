import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Item } from 'src/app/model/item';

export const loadItems = createAction(
  '[Item/API] Load Items', 
  props<{ Items: Item[] }>()
);

export const addItem = createAction(
  '[Item/API] Add Item',
  props<{ Item: Item }>()
);

export const upsertItem = createAction(
  '[Item/API] Upsert Item',
  props<{ Item: Item }>()
);

export const addItems = createAction(
  '[Item/API] Add Items',
  props<{ Items: Item[] }>()
);

export const upsertItems = createAction(
  '[Item/API] Upsert Items',
  props<{ Items: Item[] }>()
);

export const updateItem = createAction(
  '[Item/API] Update Item',
  props<{ Item: Update<Item> }>()
);

export const updateItems = createAction(
  '[Item/API] Update Items',
  props<{ Items: Update<Item>[] }>()
);

export const deleteItem = createAction(
  '[Item/API] Delete Item',
  props<{ id: string }>()
);

export const deleteItems = createAction(
  '[Item/API] Delete Items',
  props<{ ids: string[] }>()
);

export const clearItems = createAction(
  '[Item/API] Clear Items'
);
