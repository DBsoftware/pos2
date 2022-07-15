import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerComponent } from './timer.component';
import { MaterialModule } from 'src/app/utils/material.module';



@NgModule({
  declarations: [TimerComponent],
  exports: [TimerComponent],
  imports: [
    MaterialModule
  ]
})
export class TimerModule { }
