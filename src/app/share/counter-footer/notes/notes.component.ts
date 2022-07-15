import { Component, Input, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { shareReplay, tap } from 'rxjs/operators';
import { Order } from 'src/app/model/order';
import { ButtonPillsService } from 'src/app/services/buttons/button-pills.service';
import { ManagerState } from 'src/app/store';
import { loadSelectedOrdersSuccess } from 'src/app/store/selected-order/selected-order.actions';
import { getSelected } from 'src/app/store/selected-order/selected-order.selectors';
import { buttonsFooter } from './static-data';
@UntilDestroy()
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  buttonsFooter = buttonsFooter
  @Input() isCounter = true
  orderSelected
  constructor(
    private store: Store<ManagerState>,
    public _pillService: ButtonPillsService
    ) { 
    this.store.select(getSelected)
    .pipe(untilDestroyed(this),
    tap(e => this.orderSelected = e))
    .subscribe()
  }

  ngOnInit(): void {
  }

  insertOnSelected(value){
    let aux = new Order().setOrder({...this.orderSelected})
    aux['order_note'] = value
    this.store.dispatch(loadSelectedOrdersSuccess({data: aux}))
  }

  adjust(value){
    return value.replace(/!&;/g, '\n' )
  }

}
