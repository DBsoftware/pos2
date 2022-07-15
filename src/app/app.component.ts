import {  Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { DetailsDialogComponent } from './dialogs/detailsDialog/details-dialog.component';
import { DialogOneComponent } from './dialogs/dialog-one/dialog-one.component';
import { DialogTwoComponent } from './dialogs/dialog-two/dialog-two.component';
import { ManagerState } from './store';
import {
  openDialogDetailsSuccess,
  openDialogManualSuccess,
  openDialogOneSuccess,
  openDialogOptionsSuccess,
  openDialogReceiptSuccess,
  openDialogTwoSuccess,
  openQrDialog} from './store/Dialogs/dialog.actions';
import {   getDetailsOpenstate,
  getManualOpenState,
  getOneOpenState,
  getReceiptOpenState,
  getOptionsOpenState,
  getTwoOpenState, } from './store/Dialogs/dialog.selectors';
import { ManualPayComponent } from './dialogs/dialog-manualPay/manual-pay.component';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { OptionsDialogComponent } from './dialogs/dialog-options/options-dialog.component';
import {  GENERAL_SPINNER, REQUEST_SPINNER } from './utils/mncTypes-enums';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DialogReceiptComponent } from './dialogs/dialog-receipt/dialog-receipt.component';
import { QrDialogComponent } from './dialogs/qrDialog/qr-dialog.component';
import { getQrOpenState } from './store/Dialogs/dialog.selectors';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public generalSpinner = GENERAL_SPINNER;
  // routerSpinner = ON_ROUTER_SPINNER;
  requestSpinner = REQUEST_SPINNER;
  title = 'restaurantManager';
  detailsconfig = {panelClass: 'dlgDetailsConfig'}
  twoconfig = {panelClass: 'dlgCustomerHistory'}
  oneconfig = {panelClass: 'dlg'}
  receiptconfig = {panelClass: 'dlg'}
  qrconfig = {panelClass: 'dlg'}
  manualConfig = {panelClass: 'dlg'}
  optionsConfig = {panelClass: 'dlgOptions'}
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private store: Store<ManagerState>,
    ){
              this.spinner.show(GENERAL_SPINNER)
              console.log('hello')

  }
  ngOnInit(){
    this.store.select(getDetailsOpenstate)
    .pipe(untilDestroyed(this),tap(e => e ? this.openDialog('d'): null)).subscribe()
    this.store.select(getOneOpenState)
    .pipe(untilDestroyed(this),tap(e => e ? this.openDialog('o'): null)).subscribe()
    this.store.select(getTwoOpenState)
    .pipe(untilDestroyed(this),tap(e => e ? this.openDialog('t'): null)).subscribe()
    this.store.select(getManualOpenState)
    .pipe(untilDestroyed(this),tap(e => e ? this.openDialog('m'): null)).subscribe()
    this.store.select(getOptionsOpenState)
    .pipe(untilDestroyed(this),tap(e => e ? this.openDialog('p'): null)).subscribe()
    this.store.select(getReceiptOpenState)
    .pipe(untilDestroyed(this),tap(e => e ? this.openDialog('r'): null)).subscribe()
    this.store.select(getQrOpenState)
    .pipe(untilDestroyed(this),tap(e => e ? this.openDialog('q'): null)).subscribe()
  }

  openDialog(kind){
      this.dialog.open(
        {
          d: DetailsDialogComponent,
          o: DialogOneComponent,
          t: DialogTwoComponent,
          m: ManualPayComponent,
          p: OptionsDialogComponent,
          r: DialogReceiptComponent,
          q: QrDialogComponent,
        }[kind],
        {...{
          d: this.detailsconfig,
          o: this.oneconfig,
          t: this.twoconfig,
          m: this.manualConfig,
          p: this.optionsConfig,
          r: this.receiptconfig,
          q: this.qrconfig
        }[kind]}  ,
        ).afterClosed()
        .subscribe(e =>
          this.store.dispatch({
            d: openDialogDetailsSuccess,
            o: openDialogOneSuccess,
            t: openDialogTwoSuccess,
            m: openDialogManualSuccess,
            p: openDialogOptionsSuccess,
            r: openDialogReceiptSuccess,
            q: openQrDialog
          }[kind]({data: false})))
    }

    ngAfterViewInit() {
      this.router.events.pipe(untilDestroyed(this))
      .subscribe(event => {
          if (event instanceof NavigationStart) {
              // this.spinner.show(ON_ROUTER_SPINNER)
              // this.spinner.hide(GALLERY_SPINNER)
          }
          if (event instanceof NavigationEnd) {
              this.spinner.hide(GENERAL_SPINNER)
          }
      });

  }


}


