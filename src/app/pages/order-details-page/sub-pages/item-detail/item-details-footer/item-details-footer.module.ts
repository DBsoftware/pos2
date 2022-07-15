import { NgModule } from '@angular/core';
import { ItemDetailsFooterComponent } from './item-details-footer.component';
import { MaterialModule } from 'src/app/utils/material.module';
import { ShareModule } from 'src/app/share/share.module';



@NgModule({
  declarations: [ItemDetailsFooterComponent],
  exports: [ItemDetailsFooterComponent],
  imports: [
    MaterialModule,
    ShareModule
  ]
})
export class ItemDetailsFooterModule { }
