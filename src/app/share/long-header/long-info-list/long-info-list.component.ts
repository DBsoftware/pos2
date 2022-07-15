import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { combineLatest, zip } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { DeliveryNPickData, DineInData, PickData } from 'src/app/pages/counter-page/static-data';
import { longHeaderData as longKitchen } from 'src/app/pages/kitchen-page/static-data';
import { FormService } from 'src/app/services/utils/form.service';
import { ManagerState } from 'src/app/store';
import { getSelectedOrderTypeIsDelivery, getSelectedOrderTypeIsPick } from 'src/app/store/selected-order/selected-order.selectors';
import { getPosition } from 'src/app/store/user/user.selectors';


@UntilDestroy()
@Component({
  selector: 'app-long-info-list',
  templateUrl: './long-info-list.component.html',
  styleUrls: ['./long-info-list.component.scss']
})
export class LongInfoListComponent implements OnInit, OnDestroy {
  @Input() longHeaderData
  @Input() buttonsRow
  data
  @Input() isCounter
  constructor(public _formService:FormService, private store: Store<ManagerState> ){}

  ngOnInit(): void {
    this.store.select(getPosition)
    .pipe(untilDestroyed(this),
      tap(e => this.data = longKitchen),
      filter(e => !!e && !e.includes('kitchen')),
      switchMap(e => combineLatest(
        [this.store.select(getSelectedOrderTypeIsDelivery),
        this.store.select(getSelectedOrderTypeIsPick)]
        )),
      tap(e => {
        console.log('Info',e)
        this.data = (!e[0] && !e[1]) ? DineInData : (!!e[0] ? DeliveryNPickData : PickData)
      })
      ).subscribe(e => {
      this._formService.form = this.data
      this._formService.OnInit()
    })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this._formService.form = null
  }

}
