import { NgModule } from '@angular/core';
import { QrDialogComponent } from './qr-dialog.component';
import { MaterialModule } from '../../utils/material.module';
import { ShareModule } from '../../share/share.module';
import { QRCodeModule } from 'angularx-qrcode';



@NgModule({
  declarations: [QrDialogComponent],
  imports: [
    MaterialModule,
    ShareModule,
    QRCodeModule
  ]
})
export class QrDialogModule { }
