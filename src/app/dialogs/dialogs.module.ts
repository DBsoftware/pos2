import { NgModule } from '@angular/core';
import { DialogOneModule } from './dialog-one/dialog-one.module';
import { DialogTwoModule } from './dialog-two/dialog-two.module';
import { DetailsDialogModule } from './detailsDialog/details-dialog.module';
import { ManualPayModule } from './dialog-manualPay/manual-pay.module';
import { OptionsDialogModule } from './dialog-options/options-dialog.module';
import { DialogReceiptModule } from './dialog-receipt/dialog-receipt.module';
import { QrDialogComponent } from './qrDialog/qr-dialog.component';
import { QrDialogModule } from './qrDialog/qr-dialog.module';



@NgModule({
  imports: [
    DialogOneModule,
    DialogTwoModule,
    DetailsDialogModule,
    ManualPayModule,
    OptionsDialogModule,
    DialogReceiptModule,
    QrDialogModule
  ],
  exports: [
    DialogOneModule,
    DialogTwoModule,
    DetailsDialogModule,
    ManualPayModule,
    OptionsDialogModule,
    DialogReceiptModule,
    QrDialogModule
  ]
})
export class DialogsModule { }
