import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { NmcMessage } from 'src/app/model/nmc_message';


export const loadMessagesTables = createAction(
  '[MessagesTable/API] Load MessagesTables',
  props<{ messagesTables: NmcMessage[] }>()
);

export const addMessagesTable = createAction(
  '[MessagesTable/API] Add MessagesTable',
  props<{ messagesTable: NmcMessage }>()
);

export const upsertMessagesTable = createAction(
  '[MessagesTable/API] Upsert MessagesTable',
  props<{ messagesTable: NmcMessage }>()
);

export const addMessagesTables = createAction(
  '[MessagesTable/API] Add MessagesTables',
  props<{ messagesTables: NmcMessage[] }>()
);

export const upsertMessagesTables = createAction(
  '[MessagesTable/API] Upsert MessagesTables',
  props<{ messagesTables: NmcMessage[] }>()
);

export const updateMessagesTable = createAction(
  '[MessagesTable/API] Update MessagesTable',
  props<{ messagesTable: Update<NmcMessage> }>()
);

export const updateMessagesTables = createAction(
  '[MessagesTable/API] Update MessagesTables',
  props<{ messagesTables: Update<NmcMessage>[] }>()
);

export const deleteMessagesTable = createAction(
  '[MessagesTable/API] Delete MessagesTable',
  props<{ id: string }>()
);

export const deleteMessagesTables = createAction(
  '[MessagesTable/API] Delete MessagesTables',
  props<{ ids: string[] }>()
);

export const clearMessagesTables = createAction(
  '[MessagesTable/API] Clear MessagesTables'
);
