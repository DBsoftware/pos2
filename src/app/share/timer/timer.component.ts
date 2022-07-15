import { AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { switchMap, tap } from 'rxjs/operators';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { ManagerState } from 'src/app/store';
import { getSelected } from 'src/app/store/selected-order/selected-order.selectors';

@UntilDestroy()
@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, AfterViewInit {
  @Input() order_date =  moment().format('YYYY-MM-DD HH:mm:ss')
  @Input() isReady =  false
  @Input() isClose =  false
  @Input() isCancel =  false
  @Input() label = ''
  timer = ''
  orderSelected
  hasLabel = false
  constructor(
    private _utils: UtilsService,
    private store: Store<ManagerState>,
    private cdref: ChangeDetectorRef) {

    }

  ngOnInit(): void {
    if(this.label.length > 0){
      this.store.select(getSelected)
      .pipe(untilDestroyed(this),
      tap(e => this.orderSelected = e),
      )
      .subscribe(e => {
        this.order_date = this.orderSelected.order_date
        this.isReady = this.orderSelected.isReady
        this.isClose = this.orderSelected.isClose
        this.isCancel = this.orderSelected.isCancel
        this.setTimer()
      })
    }
    this._utils.clockSubjectObservable()
    .pipe(
      untilDestroyed(this),
    )
    .subscribe(e => {
      this.setTimer()
    })
  }

  setTimer(){
    this.timer =  this.isReady || this.isClose || this.isCancel ?
    (this.isReady ? 'Order Finished': (this.isClose ? 'Order Closed': 'Order Canceled') ):
    `${this.label}${UtilsService.pad(moment.duration(moment().diff(moment(this.order_date))).hours().toFixed(0), 2)}:${UtilsService.pad(moment.duration(moment().diff(moment(this.order_date))).minutes().toFixed(0), 2)}:${UtilsService.pad(moment.duration(moment().diff(moment(this.order_date))).seconds().toFixed(0), 2)}`
  }


  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.cdref.detectChanges()
  }

}
