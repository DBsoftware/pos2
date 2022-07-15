import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/utils/material.module';
import { FlatcardComponent } from './flatcard/flatcard.component';



@NgModule({
  declarations: [FlatcardComponent],
  imports: [
    MaterialModule,
  ],
  exports: [FlatcardComponent]
})
export class FlatcardModule { }
