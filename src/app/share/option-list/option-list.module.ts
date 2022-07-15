import { NgModule } from '@angular/core';
import { OptionListComponent } from './option-list.component';
import { MaterialModule } from 'src/app/utils/material.module';



@NgModule({
  declarations: [OptionListComponent],
  exports: [OptionListComponent],
  imports: [
    MaterialModule
  ]
})
export class OptionListModule { }
