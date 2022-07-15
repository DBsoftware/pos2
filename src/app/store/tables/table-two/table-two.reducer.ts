import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as ItemActions from './table-two.actions';
import { Item } from 'src/app/model/item';

export const ItemesFeatureKey = 'tableItems';

export interface State extends EntityState<Item> {
  // additional entities state properties
}

// export const adapter: EntityAdapter<Item> = createEntityAdapter<Item>();

export const adapter: EntityAdapter<Item> = createEntityAdapter<Item>({
  selectId: (model: Item) => model.order_detail_id,
});

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});


export const reducer = createReducer(
  initialState,
  on(ItemActions.addItem,
    (state, action) => adapter.addOne(action.Item, state)
  ),
  on(ItemActions.upsertItem,
    (state, action) => adapter.upsertOne(action.Item, state)
  ),
  on(ItemActions.addItems,
    (state, action) => adapter.addMany(action.Items, state)
  ),
  on(ItemActions.upsertItems,
    (state, action) => adapter.upsertMany(action.Items, state)
  ),
  on(ItemActions.updateItem,
    (state, action) => adapter.updateOne(action.Item, state)
  ),
  on(ItemActions.updateItems,
    (state, action) => adapter.updateMany(action.Items, state)
  ),
  on(ItemActions.deleteItem,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(ItemActions.deleteItems,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(ItemActions.loadItems,
    (state, action) => adapter.setAll(action.Items, state)
  ),
  on(ItemActions.clearItems,
    state => adapter.removeAll(state)
  ),
);


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export const selectAllItems = selectAll;
export const selectTotalItems = selectTotal;

