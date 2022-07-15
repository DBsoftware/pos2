import { NgModule } from '@angular/core';
import { TableComponent } from './table.component';
import { MaterialModule } from 'src/app/utils/material.module';
import { PillbuttonComponent } from '../pillbutton/pillbutton.component';
import { PillButtonModule } from '../pillbutton/pill-button.module';
import { TimerComponent } from '../timer/timer.component';
import { TimerModule } from '../timer/timer.module';



@NgModule({
  declarations: [TableComponent],
  imports: [
    MaterialModule, 
    TimerModule,
    PillButtonModule
  ],
  exports: [TableComponent]
})
export class TableModule { }
