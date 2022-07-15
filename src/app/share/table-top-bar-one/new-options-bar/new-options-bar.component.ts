import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { map, shareReplay, tap } from 'rxjs/operators';
import { ManagerState } from 'src/app/store';
import { getWay } from 'src/app/store/counter-state/counter.selectors';
import { getSelectedOrdernumber } from 'src/app/store/selected-order/selected-order.selectors';

@Component({
  selector: 'app-new-options-bar',
  templateUrl: './new-options-bar.component.html',
  styleUrls: ['./new-options-bar.component.scss']
})
export class NewOptionsBarComponent implements OnInit {
  fat = {classes:'solid-white-bc-green', label:'New order'}
  state
  ordernumber
  constructor(private dialog: MatDialog, 
    private store: Store<ManagerState>) { }

  ngOnInit(): void {
    this.state = this.store.select(getWay).pipe(map(e => e.includes('first')))
    this.ordernumber = this.store.select(getSelectedOrdernumber)
    .pipe(
      tap(console.log),
      shareReplay())
  }



}
