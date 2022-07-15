import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersFormComponent } from './orders-form.component';
import { MaterialModule } from 'src/app/utils/material.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [OrdersFormComponent],
  exports: [OrdersFormComponent],
  imports: [
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class OrdersFormModule { }
