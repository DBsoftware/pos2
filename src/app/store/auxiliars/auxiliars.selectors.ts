import * as fromAuxiliarsReducers from './auxiliars.reducer'
import {createFeatureSelector, createSelector} from '@ngrx/store';
import { Calendar } from '../../model/calendar';
import * as moment from 'moment';

export const selectListAuxiliarsState =
    createFeatureSelector<fromAuxiliarsReducers.State>("auxiliars");

export const getListAuxiliars = createSelector(
    selectListAuxiliarsState,
    (st) => st.list
)
export const getGlobalParams = createSelector(
    selectListAuxiliarsState,
    (st) => st.globalParams
)
export const getGlobalCategories = createSelector(
    selectListAuxiliarsState,
    (st) => st.categories
)
export const getAppInitState = createSelector(
    selectListAuxiliarsState,
    (st) => st.initiated
)
export const getMerchantCategories = createSelector(
    selectListAuxiliarsState,
    (st) => st.merchantCategories
)

export const getScrollStatus = createSelector(
    selectListAuxiliarsState,
    (st) => st.list.scrollChange
)
export const getCoordinates = createSelector(
    selectListAuxiliarsState,
    (st) => st.coordinates
)

export const getMessagesCounter = createSelector(
    selectListAuxiliarsState,
    (st) => !!st.messagesCounter? Number(st.messagesCounter) :  0
)
export const areThereCoordinates = createSelector(
    getCoordinates,
    (st) => st && st.lat != 0 && st.lng != 0
)
export const getSeatingAreas = createSelector(
    selectListAuxiliarsState,
    (st) => st.seating_area_options
)
export const getSeatingAreasSectionName = createSelector(
    getSeatingAreas,
    (st, props) => !!props.id ?st.filter(e => e.seating_area_id.includes(props.id))[0].section_name: ''
)
export const getTablesSeatingAreas = createSelector(
    selectListAuxiliarsState,
    (st) => st.tables_by_seating_area
)
export const getAssigns = createSelector(
    selectListAuxiliarsState,
    (st) => st.assigns
)
export const getPromos = createSelector(
    selectListAuxiliarsState,
    (st) => st.promo
)
export const getCa = createSelector(
    selectListAuxiliarsState,
    (st) => st.ca
)
export const getDeliveriesMethods = createSelector(
    selectListAuxiliarsState,
    (st) => st.delivery_methods
)
export const getSelectedCa = createSelector(
    selectListAuxiliarsState,
    (st) => st.seCa
)



export const getEventsValue = createSelector(
  selectListAuxiliarsState,
  (st) => st.ca.map((e:Calendar) => (
    {
      title: e.fullName,
      start: `${e.reservation_date}T${moment(e.calendar_startHour, ['LT']).format(moment.HTML5_FMT.TIME_SECONDS)}`,
      end: `${e.reservation_date}T${moment(e.calendar_endHour, ['LT']).format(moment.HTML5_FMT.TIME_SECONDS)}`,
      extendedProps: {
        id: e.reservation_id,
        date: e.reservation_date
      }
      // backgroundColor: !e.priority ?'green':'red',
      // borderColor: !e.priority ?'green':'red'
    }
  )))
