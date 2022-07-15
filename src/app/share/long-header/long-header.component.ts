import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ManagerState } from 'src/app/store';
import {  timerLabel } from './static-data';
import { delay, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Order } from 'src/app/model/order';
import { getSelected } from 'src/app/store/selected-order/selected-order.selectors';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-long-header',
  templateUrl: './long-header.component.html',
  styleUrls: ['./long-header.component.scss']
})
export class LongHeaderComponent implements OnInit {
  timer = timerLabel 
  @Input() longHeaderData
  @Input() buttonsrow
  @Input() isCounter
  orderSelected: Observable<Order>
  constructor(
    private store: Store<ManagerState>) { }

  ngOnInit(): void {
    this.orderSelected = this.store.select(getSelected)
    .pipe(
      delay(0),
      shareReplay()
      )
      // this.utils.checkSubjectObservable()
      // .subscribe(e => this.cdref.detectChanges())
    
  }


  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.


  }


}
