import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromDetails from './Dialogs/dialog.reducer'
import * as fromItems from './items/items.reducer'
import * as fromAuxiliars from './auxiliars/auxiliars.reducer';
import * as fromUser from './user/user.reducer';
import * as fromTableOrder from './tables/table-one/table-one.reducer';
import * as fromTableItems from './tables/table-two/table-two.reducer';
import * as fromTableThree from './tables/table-three/table-three.reducer';
import * as fromTableFourth from './tables/table-fourth/table-fourth.reducer';
import * as fromTableMessages from './tables/table-messages/messages-table.reducer';
import * as fromSelected from './selected-order/selected-order.reducer'
import * as fromItemsCollection from './items-collection/items-collection.reducer'
import * as fromCustomer from './customer/customer.reducer'
import * as fromCounter from './counter-state/counter.reducer'
import * as fromChat from './chat/chat.reducer'
import * as fromForm from './form/form.reducer'
import { Business } from '../model/business';

export interface ManagerState {
    [fromDetails.detailsFeatureKey]: fromDetails.State,
    [fromItems.itemsFeatureKey]: fromItems.State,
    [fromAuxiliars.auxiliarsFeatureKey]: fromAuxiliars.State;
    [fromUser.userFeatureKey]: Business;
    [fromTableOrder.tableOrdersFeatureKey]: fromTableOrder.State,
    [fromTableItems.ItemesFeatureKey]: fromTableItems.State,
    [fromSelected.selectedOrderFeatureKey]: fromSelected.State,
    [fromItemsCollection.itemsCollectionFeatureKey]: fromItemsCollection.State,
    [fromCustomer.customerFeatureKey]: fromCustomer.State,
    [fromCounter.counterFeatureKey]: fromCounter.State,
    [fromTableThree.tableThreesFeatureKey]: fromTableThree.State,
    [fromTableFourth.tableFourthsFeatureKey]: fromTableFourth.State,
    [fromTableMessages.messagesTablesFeatureKey]: fromTableMessages.State,
    [fromChat.chatFeatureKey]: fromChat.State,
    [fromForm.formFeatureKey]: fromForm.State,

}

export const reducers: ActionReducerMap<ManagerState> = {
  "dialogs": fromDetails.reducer,
  "items": fromItems.reducer,
  "auxiliars": fromAuxiliars.reducer,
  "user": fromUser.reducer,
  "tableOrders": fromTableOrder.reducer,
  "tableItems": fromTableItems.reducer,
  "selectedOrder": fromSelected.reducer,
  "itemsCollection": fromItemsCollection.reducer,
  "customer": fromCustomer.reducer,
  "counter": fromCounter.reducer,
  "tableCustomers": fromTableThree.reducer,
  "tableFourths": fromTableFourth.reducer,
  "messagesTables": fromTableMessages.reducer,
  "chat": fromChat.reducer,
  "form": fromForm.reducer
};


export const metaReducers: MetaReducer<ManagerState>[] = !environment.production ? [] : [];
