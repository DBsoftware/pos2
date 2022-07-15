import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/utils/material.module';
import { ItemCardModule } from '../itemcard/item-card.module';
import { ProductsCarouselComponent } from './products-carousel.component';
import {SwiperModule} from 'ngx-swiper-wrapper';



@NgModule({
  declarations: [ProductsCarouselComponent],
  imports: [
    MaterialModule,
    ItemCardModule,
    SwiperModule
  ], exports: [ 
    ProductsCarouselComponent
  ]
})
export class CarouselModule { }
