import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Item } from 'src/app/model/item';
import { Order } from 'src/app/model/order';
import { ORDERTYPEEnum } from 'src/app/utils/mncTypes-enums';


import * as fromSelectedReducer from './selected-order.reducer'

export const selectSelectedState =
    createFeatureSelector<fromSelectedReducer.State>("selectedOrder");

    export const getSelected = createSelector(
        selectSelectedState,
        (st) => new Order().setOrder({...st.order})
    )
    export const getSelectedItems = createSelector(
        getSelected,
        (st) => !!st.items ? st.items.map(it => new Item().setItem({...it})) : []
    )
    export const getSelectedItemsDone = createSelector(
        getSelected,
        (st) =>  st.items.filter(e => e.statusDetailIsDone)
    )
    export const getSelectedOrdernumber = createSelector(
        selectSelectedState,
        (st) => !!st.order && !!st.order.order_number ? st.order.order_number: null
    )
    export const getSelectedOrderType = createSelector(
        selectSelectedState,
        (st) => !!st.order && !!st.order.order_type_id ? st.order.order_type_id: ORDERTYPEEnum.DINE_IN
    )
    export const getSelectedOrderTypeIsDelivery = createSelector(
        getSelectedOrderType,
        (st) => st.includes(ORDERTYPEEnum.Delivery)
    )
    export const getSelectedOrderTypeIsPick = createSelector(
        getSelectedOrderType,
        (st) => st.includes(ORDERTYPEEnum.Pick_Up)
    )
    export const getFormValidation = createSelector(
        selectSelectedState,
        (st) => st.isValidAddOrder
    )


