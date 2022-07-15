import { Action, createReducer, on } from '@ngrx/store';
import { initiatedAuxiliars,
  loadListAuxiliars,
  clearListAuxiliars,
  loadGlobalAuxiliarsSuccess,
  loadCategoriesAuxiliarsSuccess,
  loadCoordinatesAuxiliarsSuccess,
  loadMerchantCategoriesSuccess,
  loadSeatingAreaSuccess,
  ClearSeatingAreaSuccess,
  loadTableSeatingAreaSuccess,
  ClearTableSeatingAreaSuccess,
  loadMessagesTotal, clearMessagesTotal, loadErrorsSuccess, ClearErrorsSuccess, loadDeliveryMethodsSuccess, loadAssignsSuccess, loadCalendaruccess, loadCalendarSelectedSuccess, loadPromotionsSuccess, addCalendaruccess
 } from './auxiliars.actions';
import { listAuxiliars } from './auxiliars.models';
import { GlobalParam } from '../../model/global-param';
import { Calendar } from 'src/app/model/calendar';


export const auxiliarsFeatureKey = 'auxiliars';

export interface State {
  list?: listAuxiliars,
  globalParams: GlobalParam,
  categories?: any
  initiated?: string
  coordinates?: {lat: any, lng: any}
  merchantCategories?: []
  messagesCounter?: number
  //new
  errors?: any
  seating_area_options?: any
  delivery_methods?: any
  tables_by_seating_area?: any
  assigns: any
  promo: any
  ca: Array<Calendar>,
  seCa: any
}

export const initialState: State = {
  list:  {
    listStruct: '',
    carouselType: '',
    searchTerm: '',
    sort: '',
    scrollChange: false
    },
  globalParams: null,
  categories: null,
  initiated: null,
  messagesCounter: 0,
  coordinates: {lng: 0, lat: 0},
  merchantCategories: [],
  errors: [],
  seating_area_options: [],
  delivery_methods: [],
  tables_by_seating_area: [],
  assigns: [],
  promo: [],
  ca: [],
  seCa: null
};

const auxiliarsReducer = createReducer(
  initialState,
  on(loadListAuxiliars,(state, {data})=> ({...state, list: {...state.list,...data}})),
  on(loadGlobalAuxiliarsSuccess,(state, {data})=> ({...state, globalParams: data})),
  on(loadCategoriesAuxiliarsSuccess,(state, {data})=> ({...state, categories: data})),
  on(loadCoordinatesAuxiliarsSuccess,(state, {data})=> ({...state, coordinates: data})),
  on(clearListAuxiliars,(state)=> ({...state, list: {...initialState.list}})),
  on(initiatedAuxiliars,(state, {data})=> ({...state,initiated: data})),
  on(loadMessagesTotal,(state, {data})=> ({...state,messagesCounter: data})),
  on(loadAssignsSuccess,(state, {data})=> ({...state,assigns: data})),
  on(loadPromotionsSuccess,(state, {data})=> ({...state,promo: data})),
  on(addCalendaruccess,(state, {data})=> ({...state,ca: [...state.ca,data]})),
  on(loadCalendaruccess,(state, {data})=> ({...state,ca: data})),
  on(loadCalendarSelectedSuccess,(state, {data})=> ({...state,seCa: data})),
  on(clearMessagesTotal,(state)=> ({...state,messagesCounter: 0})),
  on(loadMerchantCategoriesSuccess, (state, {data}) => ({...state, merchantCategories: data})),
  on(loadErrorsSuccess, (state, {data}) => ({...state, errors: [...state.errors,data]})),
  on(ClearErrorsSuccess, (state) => ({...state, errors: []})),
  on(loadSeatingAreaSuccess, (state, {data}) => ({...state, seating_area_options: data})),
  on(ClearSeatingAreaSuccess, (state) => ({...state, seating_area_options: null})),
  on(loadTableSeatingAreaSuccess, (state, {data}) => ({...state, tables_by_seating_area: data})),
  on(loadDeliveryMethodsSuccess, (state, {data}) => ({...state, delivery_methods: data})),
  on(ClearTableSeatingAreaSuccess, (state) => ({...state, tables_by_seating_area: null})),

);

export function reducer(state: State | undefined, action: Action) {
  return auxiliarsReducer(state, action);
}
