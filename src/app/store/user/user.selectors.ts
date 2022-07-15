import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Business } from 'src/app/model/business';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { USER_TYPE } from 'src/app/utils/mncTypes-enums';

export const selectUserState =
    createFeatureSelector<Business>("user");

export const getUserState = createSelector(
    selectUserState,
    (st) => st
)
export const getUserName = createSelector(
    selectUserState,
    (st) => !!st && !!st.firstName? st.firstName + ' ' + st.lastName : ''
)
export const getDepartment = createSelector(
    selectUserState,
    (st) => !!st && !!st.department? st.department: null
)
export const iswaiter = createSelector(
  getDepartment,
    (st) => !!st && (!!st.includes('61319') || !!st.includes('61316')))

export const getPosition = createSelector(
    getDepartment,
    (st) => !!st ? USER_TYPE[st] : null
)
export const getMerchantName = createSelector(
    selectUserState,
    (st) => !!st && !!st.companyName? st.companyName : ''
)
export const getUserId = createSelector(
    selectUserState,
    (st) => !!st && !!st.id? st.id : null
)
export const getMerchantId = createSelector(
    selectUserState,
    (st) => !!st && !!st.merchant_id? st.merchant_id : null
)
export const getLocationId = createSelector(
    selectUserState,
    (st) => !!st && !!st.location_id? st.location_id : null
)
export const hasMerchantId = createSelector(
    selectUserState,
    (st) => !!st && !!st.merchant_id
)
export const getHexMerchantId = createSelector(
    selectUserState,
    (st) => !!st && !!st.merchant_id? UtilsService.toHex(st.merchant_id) : null
)
export const getHexUserId = createSelector(
    selectUserState,
    (st) => !!st && !!st.id? UtilsService.toHex(st.id) : null
)


