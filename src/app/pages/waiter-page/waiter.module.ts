import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdCarouselModule } from 'src/app/share/ad-carousel/ad-carousel.module';
import { ShareModule } from 'src/app/share/share.module';
import { MaterialModule } from 'src/app/utils/material.module';
import { WaiterComponent } from './waiter.component';

export const routes = [
  {path: '', component: WaiterComponent, pathMatch: 'full'},
];

@NgModule({
  declarations: [WaiterComponent],
  imports: [
    RouterModule.forChild(routes),
    MaterialModule,
    ShareModule,
    AdCarouselModule
  ]
})
export class WaiterModule { }
