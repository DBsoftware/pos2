import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { delay } from 'rxjs/operators';
import { Order } from 'src/app/model/order';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { ManagerState } from 'src/app/store';
import { getSeatingAreasSectionName } from 'src/app/store/auxiliars/auxiliars.selectors';


@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent implements OnInit, AfterViewInit, AfterContentChecked {
  @Input() order: Order
  areas
  fatButton = {classes:"white bc-hard-orange" ,label:"View"}
  items = [
    {
      name: 'Item 1 Title',
      options: 'Item 1 Options',
      instructions: 'Special Instructions'
    },
    {
      name: 'Item 2 Title',
      options: 'Item 2 Options',
      instructions: 'Special Instructions'
    },
    {
      name: 'Item 3 Title',
      options: 'Item 3 Options',
      instructions: 'Special Instructions'
    },
  ]
  total = 10
  price
  constructor(
    private store: Store<ManagerState>, 
    private utils: UtilsService, 
    private cdref: ChangeDetectorRef) {
  }
  
  ngOnInit(): void {
    this.utils.checkSubjectObservable()
    .pipe(delay(500))
    .subscribe(e => this.cdref.detectChanges())
    this.areas = this.store.select(getSeatingAreasSectionName, {id: this.order.seating_area_id})
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }


}
