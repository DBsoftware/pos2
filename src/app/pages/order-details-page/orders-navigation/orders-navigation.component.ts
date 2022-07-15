import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { filter, map, shareReplay, tap } from 'rxjs/operators';
import { ManagerState } from 'src/app/store';
import { getSelectedOrdernumber } from 'src/app/store/selected-order/selected-order.selectors';
import { PATHORDERDEATILS } from 'src/app/utils/mncTypes-enums';
@UntilDestroy()
@Component({
  selector: 'app-orders-navigation',
  templateUrl: './orders-navigation.component.html',
  styleUrls: ['./orders-navigation.component.scss']
})
export class OrdersNavigationComponent implements OnInit {
  buttonsOnOrder = [
    // {id: 'nav' ,label: 'Message', color: 'hard-blue white w-100 soft-border'},
    {id: 'nav' ,label: 'Add items', color: 'blue white w-100 soft-border p-0'},
    {label: 'Save', color: 'hard-orange white w-100 soft-border'},
    {id: 'nav' ,label: 'Cancel', color: 'hard-red white w-100 soft-border'},
    {id: 'nav' ,label: 'Delivered', color: 'hard-purple white w-100 soft-border'},
  ]
  buttonsItemDetil = [
    {id: 'nav' ,label: 'View Order', color: 'hard-blue white w-100 soft-border'},
  ]
  buttons = this.buttonsOnOrder
  ordernumber
  isDetail = false
  constructor(private store: Store<ManagerState>, private router: Router) { 
    this.isDetail = this.router.url.includes(PATHORDERDEATILS.ITEMDETAIL)  || this.router.url.includes(PATHORDERDEATILS.SHOWCASE)
    this.setButtons()
  }

  ngOnInit(): void {
    this.ordernumber = this.store.select(getSelectedOrdernumber).pipe(shareReplay())
    this.router.events
    .pipe(
      filter(event => event instanceof NavigationEnd),
      map((e: NavigationEnd) => e.url),
      untilDestroyed(this))
      .subscribe( e => {
        this.isDetail =  e.includes(PATHORDERDEATILS.ITEMDETAIL) || this.router.url.includes(PATHORDERDEATILS.SHOWCASE)
        this.setButtons()
    })
  }

  setButtons(){
    this.buttons = !this.isDetail? this.buttonsOnOrder :this.buttonsItemDetil
  }


}
