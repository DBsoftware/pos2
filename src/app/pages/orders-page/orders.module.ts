import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { MaterialModule } from 'src/app/utils/material.module';
import { RouterModule } from '@angular/router';
import { ShareModule } from 'src/app/share/share.module';

export const routes = [
  {path: '', component: OrdersComponent, pathMatch: 'full'},
];

@NgModule({
  declarations: [OrdersComponent],
  imports: [
    RouterModule.forChild(routes),
    MaterialModule,
    ShareModule
  ],exports: [OrdersComponent]
})
export class OrdersModule { }
