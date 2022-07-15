import { NgModule } from '@angular/core';
import { ItemDetailsHeaderComponent } from './item-details-header.component';
import { MaterialModule } from 'src/app/utils/material.module';



@NgModule({
  declarations: [ItemDetailsHeaderComponent],
  exports: [ItemDetailsHeaderComponent],
  imports: [
    MaterialModule
  ]
})
export class ItemDetailsHeaderModule { }
