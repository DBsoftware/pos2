import { NgModule } from '@angular/core';
import { CalendarComponent } from './calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarRoutingModule } from './calendar-routing.module';
import { MaterialModule } from '../../../../utils/material.module';
import { ShareModule } from '../../../../share/share.module';
import { AppointmentFormModule } from '../appointment-form/appointment-form.module';

@NgModule({
  imports: [
    MaterialModule,
    FullCalendarModule,
    CalendarRoutingModule,
    ShareModule,
    AppointmentFormModule
  ],
  declarations: [CalendarComponent],
  exports: [CalendarComponent]
})
export class CalendarModule { }
