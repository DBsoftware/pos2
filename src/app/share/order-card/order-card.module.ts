import { NgModule } from '@angular/core';
import { OrderCardComponent } from './order-card.component';
import { MaterialModule } from 'src/app/utils/material.module';
import { ShareModule } from '../share.module';
import { FatButtonsModule } from '../fat-buttons/fat-buttons.module';
import { TimerModule } from '../timer/timer.module';



@NgModule({
  declarations: [OrderCardComponent],
  imports: [
    MaterialModule,
    FatButtonsModule,
    TimerModule
  ],exports: [OrderCardComponent]
})
export class OrderCardModule { }
