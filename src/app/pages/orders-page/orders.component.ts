import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Order } from 'src/app/model/order';
import { ManagerState } from 'src/app/store';
import { selectAllOrdersForTable } from 'src/app/store/tables/table-one/table-orders.selectors';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  cards;
  constructor(private store: Store<ManagerState>) { }

  ngOnInit(): void {
    this.cards = this.store.select(selectAllOrdersForTable)
    .pipe(map(e => e.map(it => new Order().setOrder({...it}))))
  }

}
