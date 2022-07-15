import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentFormRoutingModule } from './appointment-form-routing.module';
import { AppointmentFormComponent } from './appointment-form.component';
import { UiInputModule } from './components/ui-input/ui-input.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../utils/material.module';
// import { SharedModule } from 'src/app/shared/share.module';
import { ShareModule } from '../../../../share/share.module';


@NgModule({
  declarations: [
    AppointmentFormComponent
  ],
  exports: [
    AppointmentFormComponent
  ],
  imports: [
    MaterialModule,
    UiInputModule,
    ReactiveFormsModule,
    AppointmentFormRoutingModule,
    ShareModule
  ]
})
export class AppointmentFormModule { }
