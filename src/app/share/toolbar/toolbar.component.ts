import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { fromEvent } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { dataDuoInfo, dataOneInfo } from './static-data';
import { getUserName, getMerchantName, iswaiter } from 'src/app/store/user/user.selectors';
import { Store } from '@ngrx/store';
import { ManagerState } from 'src/app/store';
import { UtilsService } from 'src/app/services/utils/utils.service';
import * as moment from 'moment';
import { clearUser } from 'src/app/store/user/user.actions';
import {  NavigationEnd, Router } from '@angular/router';
import { PATHS } from 'src/app/utils/mncTypes-enums';
import { clearItems } from 'src/app/store/tables/table-two/table-two.actions';
import { clearSelected } from 'src/app/store/selected-order/selected-order.actions';
import { clearTableOrders } from 'src/app/store/tables/table-one/table-one.actions';


@UntilDestroy()
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, AfterContentChecked, AfterViewInit {
  staticData = dataDuoInfo
  staticSmallData = dataDuoInfo
  staticOneData = dataOneInfo
  windowSize = window.outerWidth
  name
  merchant
  time
  path
  isWaiter
  notfound
  position
  url
  constructor(
    private store: Store<ManagerState>,
    private cdref: ChangeDetectorRef,
    private _utils :UtilsService,
    private router: Router
    ) {
      this._utils.clock()
    }

  ngOnInit(): void {
    this.url = this.router.url
    this.path = this.checkPath(this.url)
    this.notfound = this.checkNotFound(this.url)
    this.router.events
    .pipe(untilDestroyed(this),
    filter(event => event instanceof NavigationEnd),
    map((e: NavigationEnd) => e.url),
    tap(e => this.path = this.checkPath(e)),
    tap(it => {
      this.isWaiter = this.store.select(iswaiter)
      .pipe(tap(e => console.log(e,this.router.url)),
      map(e => e && this.checkWaiter(it)))
    }),
      tap(e =>  this.notfound = this.checkNotFound(e)))
    .subscribe()
    fromEvent(window, 'resize')
    .pipe(
      untilDestroyed(this),
      map(e => e['target']['outerWidth']),
      tap(e => {
          this.windowSize = e;
    })).subscribe()
    this.name = this.store.select(getUserName)
    this.merchant = this.store.select(getMerchantName)
    this.time = this._utils.clockSubjectObservable().pipe(tap(e => this._utils.checkSubject.next(false)))
    // this._utils.checkSubjectObservable()
    // .subscribe(e => this.cdref.detectChanges())
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

  }

  checkWaiter(e){
    return !e.includes(PATHS.LOGIN) && !e.includes(PATHS.COUNTER) && !e.includes(PATHS.KITCHEN) && e.length > 2 && !e.includes(PATHS.CROSSROADS)
  }
  checkNotFound(e){
    return e.includes(PATHS.NOT_FOUND)
  }
  checkPath(e){
    return e.includes('/order-details/') ||  e.includes('/orders')
  }


  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  logOut(){
    localStorage.removeItem('token')
    this.store.dispatch(clearUser())
    this.store.dispatch( clearItems())
    this.store.dispatch(clearSelected())
    this.store.dispatch(clearTableOrders())
  }


  public get date() : string {
    return  moment().format('MM/DD/YY')
  }






}
