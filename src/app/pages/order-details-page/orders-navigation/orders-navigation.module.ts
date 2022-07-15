import { NgModule } from '@angular/core';
import { OrdersNavigationComponent } from './orders-navigation.component';
import { MaterialModule } from 'src/app/utils/material.module';
import { ShareModule } from 'src/app/share/share.module';



@NgModule({
  declarations: [OrdersNavigationComponent],
  exports: [OrdersNavigationComponent],
  imports: [
    MaterialModule,
    ShareModule
  ]
})
export class OrdersNavigationModule { }
