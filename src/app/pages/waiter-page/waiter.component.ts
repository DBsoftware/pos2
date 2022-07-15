import { Component, Input, OnInit } from '@angular/core';
import { CAROUSEL_TYPE } from 'src/app/share/itemcard/static-data';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { lista } from '../presentation-page/emulation-data';
import { selectAllOrdersForTable } from 'src/app/store/tables/table-one/table-orders.selectors';
import { selectBanner, selectShowcase } from 'src/app/store/items-collection/items-collection.selectors';
import { ManagerState } from 'src/app/store';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Order } from 'src/app/model/order';
import { clearSelected } from 'src/app/store/selected-order/selected-order.actions';

@Component({
  selector: 'app-waiter',
  templateUrl: './waiter.component.html',
  styleUrls: ['./waiter.component.scss']
})
export class WaiterComponent implements OnInit {
  items = JSON.parse(lista).map(e => UtilsService.unhexFields(['title', 'merchantName','description'],e))
  CAROUSEL_TYPE = CAROUSEL_TYPE
  cards;
  showcase
  banner
  constructor(private store: Store<ManagerState>) { 
    this.store.dispatch(clearSelected())
  }

  ngOnInit(): void {
    this.cards = this.store.select(selectAllOrdersForTable)
    .pipe(map(e => e.map(it => new Order().setOrder({...it}))))
    this.showcase = this.store.select(selectShowcase)
    this.banner = this.store.select(selectBanner)
  }

}
