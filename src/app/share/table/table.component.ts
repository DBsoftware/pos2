import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatSort} from '@angular/material/sort';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { map, shareReplay, take, tap } from 'rxjs/operators';
import { ManagerState } from 'src/app/store';
import { DataSource } from 'src/app/utils/datasource';
import { ORDERDETAILSTATUS, TableType} from '../../utils/mncTypes-enums';
import { Order } from 'src/app/model/order';
import { loadItems } from 'src/app/store/tables/table-two/table-two.actions';
import { loadFormValidation, loadSelectedOrdersSuccess } from 'src/app/store/selected-order/selected-order.actions';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { openDialogDetailsSuccess } from 'src/app/store/Dialogs/dialog.actions';
import { ItemsStoreService } from 'src/app/store/items/items.service';
import { selectAllItemsForTable } from 'src/app/store/tables/table-two/table-items.selectors';
import { Item } from 'src/app/model/item';
import { getUserState } from 'src/app/store/user/user.selectors';
import { Business } from 'src/app/model/business';
import { ButtonPillsService } from 'src/app/services/buttons/button-pills.service';
import { selectAllOrdersForTable } from 'src/app/store/tables/table-one/table-orders.selectors';
import { loadCustomerFormValidation, loadCustomersSuccess } from 'src/app/store/customer/customer.actions';
import { Customer } from 'src/app/model/customer';
import { selectAllCustomersForTable } from 'src/app/store/tables/table-three/table-three.selectors';
import { selectAllOrdersFourthTable } from 'src/app/store/tables/table-fourth/table-fourth.selectors';
import { getSelected } from 'src/app/store/selected-order/selected-order.selectors';
import { getCustomerState } from 'src/app/store/customer/customer.selectors';
import * as moment from 'moment';
import { interval, of, timer } from 'rxjs';
import { selectAllMessages } from 'src/app/store/tables/table-messages/messages.selectors';
import { clearActiveChat, loadChats } from 'src/app/store/chat/chat.actions';
import { EventEmitter } from '@angular/core';

@UntilDestroy()

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() expression = ''
  @Input() displayedColumns
  @Input() hasSelection
  @Input() dataSourceCarrefour;
  @Output() out = new EventEmitter();
  dataSource
  selected = ''
  sortSelected = ''
  source = of()
  selection = new SelectionModel<any>(true, []);
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  totalUnRead
  sortColumns
  user: Business
  constructor(
    private store: Store<ManagerState>,
    private cdref: ChangeDetectorRef,
    private _utils: UtilsService,
    private _pillsService: ButtonPillsService,
    private _itemsService: ItemsStoreService,
    ) {}


  ngOnInit(): void {
    this.source = this._utils.clockSubjectObservable().pipe(
      shareReplay(),
      tap(e => this._utils.checkSubject.next(false)))
    this.dataSource = new DataSource(this.resolveDataSource())
    this.dataSource.loadData()
    this.sortColumns = this.displayedColumns
    this.store.select(getSelected)
    .pipe(
      untilDestroyed(this),
      tap(e => {
      if(this.dataSourceCarrefour.includes(TableType.ORDERS)){
        this.selected =  !!e.order_number ?
          e.order_number : ''
      }
    }))
    .subscribe()
    this.store.select(getCustomerState)
    .pipe(
      untilDestroyed(this),
      tap(e => {
      if(this.dataSourceCarrefour.includes(TableType.CUSTOMERS)){
        this.selected =  !!e.customer_phone_number ?
          e.customer_phone_number : ''
      }
    }))
    .subscribe()

    this.store.select(getUserState)
    .pipe(untilDestroyed(this),tap(e => {
      this.user = e
    }))
    .subscribe()

  }

  resolveDataSource(){
    return {
      [TableType.ORDERS] : this.store.select(selectAllOrdersForTable)
      .pipe(map((data: Array<any> )=> {
        return data.map(e => new Order().setOrder({...e}))})),
      [TableType.ORDERSFOURTH] : this.store.select(selectAllOrdersFourthTable),
      [TableType.ITEMS] : this.store.select(selectAllItemsForTable),
      [TableType.CUSTOMERS] : this.store.select(selectAllCustomersForTable),
      [TableType.MESSAGES] : this.store.select(selectAllMessages),
    }[this.dataSourceCarrefour]
  }

  resolveClass(){
    return {
      [TableType.ORDERS] : 'tableContainerOne',
      [TableType.ORDERSFOURTH] : 'tableContainer',
      [TableType.ITEMS] : 'tableContainer',
      [TableType.CUSTOMERS] : 'tableContainerOne',
      [TableType.MESSAGES] : 'tableContainerOne'
    }[this.dataSourceCarrefour]
  }

  resolveLabel(){
    return {
      [TableType.ORDERS] : 'There are no orders to show',
      [TableType.ITEMS] : 'Warning: If there are not items on an order, the order will be deleted. Please be sure to keep the order with items',
      [TableType.CUSTOMERS] : 'There are no records to show',
      [TableType.ORDERSFOURTH] : 'There are no records to show',
      [TableType.MESSAGES] : 'There are no messages to show',
    }[this.dataSourceCarrefour]
  }
  resolveLabelClass(){
    return {
      [TableType.ORDERS] : '',
      [TableType.ITEMS] : 'blueText',
      [TableType.CUSTOMERS] : '',
      [TableType.ORDERSFOURTH] : '',
      [TableType.MESSAGES] : ''
    }[this.dataSourceCarrefour]
  }


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  adjustDisplayed(){
    if (!!this.hasSelection && (this.hasSelection.includes('Done')||this.hasSelection.includes('Remove'))) {
      return this.displayedColumns.slice(1)
    }
    return this.displayedColumns
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.sort.sortChange.asObservable()
    .pipe(
      tap(sortie => this.dataSource.sortDataTable()),
      tap(sortie => this.sortSelected = this.dataSource.sort.active)
    )
    .subscribe()


  }


  loadList(sort) {
    let {active, direction} = sort
    // let sortAux =`${ColumnsSortIndex[this.sortColumns.filter(e => e.label.includes(active))[0].variable]}-${direction}`
    console.log(active, direction)
    // this._requestService.buildRequestWithSubcription([
    //   {operation: OperationIndex.search_orders,
    //     plain: new Order().setOrder({sort : sortAux, merchant_id: this.user.merchant_id, location_id: this.user.location_id, user_id: this.user.id})},
    // ])
    // this.store.dispatch(loadMessageListsWithParams({data:{
    //     searchText: this.merchantName,
    //     sort: direction.length > 0  ? `${this.sortColumns[active]}-${direction}`: '114.138-desc',
    //         }}))
}

  ngOnDestroy(): void {}

  justLabels(aux){
    return aux.map(e => e.label)
  }

  resolveValue(item, variable){
    return item[variable]
  }

  action(row: Order, index = 0){
    switch (this.dataSourceCarrefour) {
      case TableType.ORDERS:
        this.ordersAction(row)
        break;
      case TableType.ITEMS:
        this.itemsAction(row, index)
        break;
      case TableType.ORDERSFOURTH:
        this.fourthAction(row)
        break;
      case TableType.CUSTOMERS:
        this.customersAction(row)
        break;
      case TableType.MESSAGES:
        this.messagesAction(row)
        break;
    }
  }

  messagesAction(row){
    this.store.dispatch(clearActiveChat())
    this.store.dispatch(loadChats({data: row}))
    this.out.emit()
  }


  fourthAction(row){
    this.ordersAction(row)
    this._pillsService.closeSubject.next(true)
  }
  customersAction(row){
    console.log('action')
    this.selected = row.customer_phone_number
    this.store.dispatch(loadCustomersSuccess({data: new Customer().setNewCustomer(row)}))
    this.store.dispatch(loadCustomerFormValidation({data: true}))
    this._pillsService.CustomerHistory(row.customer_phone_number)
  }





  isSelected(row){
    return {
      [TableType.ORDERS]: (row.order_number == this.selected),
      [TableType.ITEMS]: (row.order_detail_id == this.selected),
      [TableType.ORDERSFOURTH]: (row.order_number == this.selected),
      [TableType.CUSTOMERS]: (row.customer_phone_number == this.selected),
    }[this.dataSourceCarrefour]
  }

  changeStatus($event, row){
    $event.stopPropagation()
    let status = !row.statusDetailIsDoneDelivered ? ORDERDETAILSTATUS.Done: ORDERDETAILSTATUS.Active
    row = new Item().setItem({...row, order_detail_status: `${status}`})
    this._pillsService.fillVariables()
    this._pillsService.updateItemOperation(row)
  }



  ordersAction(row){
    this.store.dispatch(loadItems({Items: row.items? row.items : []}))
    this.store.dispatch(loadSelectedOrdersSuccess({data: row}))
    this.store.dispatch(loadFormValidation({data: true}))
  }



  itemsAction(row, index){
    if(row.statusDetailIsDoneDelivered) return
    this.selected = row.order_detail_id
        this.store.select(selectAllItemsForTable)
        .pipe(take(1), tap(console.log),map((e: []) => !!e ?  e.map((it: Item[]) => new Item().setItem({...it})) : []))
        .subscribe(e => {
          this._itemsService.activeItem(
            e.length - 1, {PC : e, category_Name: 'Order\'s items'}, index, new Item().setItem({...row, location_id: this.user.location_id, merchantId: row.merchantIdAlt? row.merchantIdAlt: row.merchantId}))
          this.store.dispatch(openDialogDetailsSuccess({data: true}))
          this._utils.updateSubject.next(true)
        })
  }

  onEvent(event) {
    event.stopPropagation();
 }

 public  timerMethod(row) {
  return row.isReady || row.isClose || row.isCancel?
   (row.isReady ? of('Order Finished'): (row.isClose? of('Order Closed'): of('Order Cancel')) )
  :this.source
  .pipe(
    map(e =>  `${UtilsService.pad(moment.duration(moment().diff(moment(row.order_date))).hours().toFixed(0), 2)}:${UtilsService.pad(moment.duration(moment().diff(moment(row.order_date))).minutes().toFixed(0), 2)}:${UtilsService.pad(moment.duration(moment().diff(moment(row.order_date))).seconds().toFixed(0), 2)}`),
    // tap(e =>  this._utils.checkSubject.next(false))
    )
}


}












