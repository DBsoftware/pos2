import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SwiperConfigInterface, SwiperPaginationInterface } from 'ngx-swiper-wrapper';
import { filter, map } from 'rxjs/operators';
import { ManagerState } from 'src/app/store';
import { getGlobalParams } from 'src/app/store/auxiliars/auxiliars.selectors';

@Component({
  selector: 'app-ad-carousel',
  templateUrl: './ad-carousel.component.html',
  styleUrls: ['./ad-carousel.component.scss']
})
export class AdCarouselComponent implements OnInit {
  @Input('slides') slides: Array<any> = [
    {imageName : 'la_mng4512221405327149019.jpg'},
    {imageName : 'la_mng4512221405327149019.jpg'},
    {imageName : 'la_mng4512221405327149019.jpg'},
    {imageName : 'la_mng4512221405327149019.jpg'},
  ];
  IMAGE_URL
  public config: SwiperConfigInterface = {};

  private pagination: SwiperPaginationInterface = {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
      dynamicMainBullets: 2
  };

  constructor(private store: Store<ManagerState>) { }

  ngOnInit(): void {
    this.IMAGE_URL =this.store.select(getGlobalParams)
    .pipe(
        filter(({IMAGE_URL}) => !!IMAGE_URL),
        map(({IMAGE_URL}) => IMAGE_URL),
        )
    this.config = {
      slidesPerView: 1,
      spaceBetween: 0,
      keyboard: true,
      navigation: true,
      pagination: this.pagination,
      grabCursor: true,
      loop: true,
      observer: false,
      preloadImages: false,
      // lazy: true,
      lazy: {
          loadPrevNext: true,
          loadPrevNextAmount: 1,
          loadOnTransitionStart: false
      },
      autoplay: {
          delay: 6000,
          disableOnInteraction: true
      },
      speed: 500,
      effect: 'fade',
      fadeEffect: {
          crossFade: true
        },
  };
  }


  goToDetails(slide: any) {

}
}
