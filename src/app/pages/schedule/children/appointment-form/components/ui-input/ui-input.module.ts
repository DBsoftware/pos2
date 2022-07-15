import { NgModule } from '@angular/core';
import { UiInputComponent } from './ui-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { MaterialModule } from '../../../../../../utils/material.module';
import { ShareModule } from '../../../../../../share/share.module';



@NgModule({
  declarations: [
    UiInputComponent
  ],
  exports: [
    UiInputComponent
  ],
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule,
    NgxMaskModule.forChild()
  ]
})
export class UiInputModule { }
