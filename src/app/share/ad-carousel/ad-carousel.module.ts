import { NgModule } from '@angular/core';
import { AdCarouselComponent } from './ad-carousel.component';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { MaterialModule } from 'src/app/utils/material.module';



@NgModule({
  declarations: [AdCarouselComponent],
  exports: [AdCarouselComponent],
  imports: [
    MaterialModule,
    SwiperModule,
  ]
})
export class AdCarouselModule { }
