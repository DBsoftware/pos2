import { NgModule } from '@angular/core';
import { DialogReceiptComponent } from './dialog-receipt.component';
import { MaterialModule } from 'src/app/utils/material.module';
import { ShareModule } from 'src/app/share/share.module';
import { ReceiptTemplateComponent } from './template/receipt-template.component';
import { NgxPrintModule } from 'ngx-print';
import { LabelsComponent } from './labels/labels.component';



@NgModule({
  declarations: [DialogReceiptComponent, ReceiptTemplateComponent, LabelsComponent],
  imports: [
    MaterialModule,
    ShareModule,
    NgxPrintModule
  ],
  exports: [
    DialogReceiptComponent
  ]
})
export class DialogReceiptModule { }
