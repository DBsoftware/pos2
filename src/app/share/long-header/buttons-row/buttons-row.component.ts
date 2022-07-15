import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { shareReplay } from 'rxjs/operators';
import { ManagerState } from 'src/app/store';
import { getSelectedOrdernumber } from 'src/app/store/selected-order/selected-order.selectors';

@Component({
  selector: 'app-buttons-row',
  templateUrl: './buttons-row.component.html',
  styleUrls: ['./buttons-row.component.scss']
})
export class ButtonsRowComponent implements OnInit {
  @Input() buttonsRow
  @Input() isCounter
  onlyCustomerHistory = {label :'Customer History', color: 'blue'}
  ordernumber
  constructor(private store: Store<ManagerState>) { }

  ngOnInit(): void {
    this.ordernumber = this.store.select(getSelectedOrdernumber)
    .pipe(
      shareReplay())
  }
}
