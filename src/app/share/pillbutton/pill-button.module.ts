import { NgModule } from '@angular/core';
import { PillbuttonComponent } from './pillbutton.component';
import { MaterialModule } from 'src/app/utils/material.module';



@NgModule({
  declarations: [PillbuttonComponent],
  imports: [
    MaterialModule
  ],
  exports: [PillbuttonComponent]
})
export class PillButtonModule { }
