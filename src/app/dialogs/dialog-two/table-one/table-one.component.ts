import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { shareReplay, switchMap } from 'rxjs/operators';
import { columnsTableOne } from 'src/app/dialogs/dialog-two/table-one/static-data';
import { ManagerState } from 'src/app/store';
import { getCustomerState } from 'src/app/store/customer/customer.selectors';
import { isACustomer } from 'src/app/store/tables/table-three/table-three.selectors';
import { TableType } from 'src/app/utils/mncTypes-enums';

@Component({
  selector: 'app-table-one',
  templateUrl: './table-one.component.html',
  styleUrls: ['./table-one.component.scss']
})
export class TableOneComponent implements OnInit {
  // @Input() dataSourceCarrefour
  TableTypeCustomers = TableType.CUSTOMERS
  columnsTableOne = columnsTableOne
  isACostumer
  button = {label: 'New Customer', color: 'hard-purple'}
  buttonClear = {label: 'Clear', color: 'hard-purple'}
  constructor(private store: Store<ManagerState>) { }

  ngOnInit(): void {
    this.isACostumer = this.store.select(getCustomerState)
    .pipe(
      switchMap(e =>  this.store.select(isACustomer,{id: e.customer_phone_number})), 
      )
  }

}
