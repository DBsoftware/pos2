import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as MessagesTableActions from './messages-table.actions';
import { NmcMessage } from 'src/app/model/nmc_message';

export const messagesTablesFeatureKey = 'messagesTables';

export interface State extends EntityState<NmcMessage> {
  // additional entities state properties
}

export const adapter: EntityAdapter<NmcMessage> = createEntityAdapter<NmcMessage>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});


export const reducer = createReducer(
  initialState,
  on(MessagesTableActions.addMessagesTable,
    (state, action) => adapter.addOne(action.messagesTable, state)
  ),
  on(MessagesTableActions.upsertMessagesTable,
    (state, action) => adapter.upsertOne(action.messagesTable, state)
  ),
  on(MessagesTableActions.addMessagesTables,
    (state, action) => adapter.addMany(action.messagesTables, state)
  ),
  on(MessagesTableActions.upsertMessagesTables,
    (state, action) => adapter.upsertMany(action.messagesTables, state)
  ),
  on(MessagesTableActions.updateMessagesTable,
    (state, action) => adapter.updateOne(action.messagesTable, state)
  ),
  on(MessagesTableActions.updateMessagesTables,
    (state, action) => adapter.updateMany(action.messagesTables, state)
  ),
  on(MessagesTableActions.deleteMessagesTable,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(MessagesTableActions.deleteMessagesTables,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(MessagesTableActions.loadMessagesTables,
    (state, action) => adapter.setAll(action.messagesTables, state)
  ),
  on(MessagesTableActions.clearMessagesTables,
    state => adapter.removeAll(state)
  ),
);


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export const selectAllMessages= selectAll;
export const selectTotalMessagselectAllMessages= selectTotal;
export const selectMessagselectAllMessages= selectEntities;
