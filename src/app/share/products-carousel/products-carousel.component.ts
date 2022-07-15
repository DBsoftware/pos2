import {Component, OnInit, Input, AfterViewInit, Output, EventEmitter, ViewChild, ElementRef, OnDestroy, SimpleChanges, SimpleChange, OnChanges} from '@angular/core';
import {Router} from '@angular/router';
import {SwiperConfigInterface} from 'ngx-swiper-wrapper';
import { MatDialog } from '@angular/material/dialog';
import { CAROUSEL_TYPE } from '../itemcard/static-data';
import { UtilsService } from '../../services/utils/utils.service';


@Component({
    selector: 'app-products-carousel',
    templateUrl: './products-carousel.component.html',
    styleUrls: ['./products-carousel.component.scss']
})
export class ProductsCarouselComponent implements OnInit,AfterViewInit, OnDestroy, OnChanges {

    @Input() products: Array<any> = [];
    @Input() category_id: string = '';
    @Output() more: EventEmitter<any> = new EventEmitter()
    public config: SwiperConfigInterface = {};
    @ViewChild('container') container: ElementRef
    @Input()
    type: CAROUSEL_TYPE;
    windowSize = window.outerWidth

    @Input()
    title: string;
    @Input()
    moduleTypeId: string;

    IMAGE_URL;
    isList = false
    CAROUSEL_TYPE = CAROUSEL_TYPE;

    constructor(
                public dialog: MatDialog,
                // private store: Store<AppState>,
                private router: Router) {
``
    }

    ngAfterViewInit(){

    }

    ngOnChanges(changes: SimpleChanges): void {
        //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
        //Add '${implements OnChanges}' to the class.
        // this.products = changes.products.currentValue
        console.log('relative',this.category_id)
    }

    navigation(){
    }

    forMe(number, Ws){
        return (this.isList && this.windowSize < 960 ? number-1 : number)
    }


    ngOnInit() {

        this.config = {
            virtual:false,
            spaceBetween: 10,
            observer: true,
            keyboard: false,
            navigation: this.products && this.products.length > 1,
            pagination: false,
            grabCursor: true,
            watchSlidesVisibility: false,
            loop: false,
            preloadImages: false,
            // lazy: true,
            preventClicks: false,
            preventClicksPropagation: true,
            lazy: {
                loadPrevNext: true,
                loadOnTransitionStart: true,
                loadPrevNextAmount: 3
            },
            autoplay: false,
            breakpoints: {
                320: {
                    slidesPerView: this.forMe(1, 375),
                    slidesPerGroup: this.forMe(1, 375),
                },
                375: {
                    slidesPerView: this.forMe(1, 425),
                    slidesPerGroup: this.forMe( 1, 425),
                },
                425: {
                    slidesPerView: this.forMe(1, 425),
                    slidesPerGroup: this.forMe( 1, 425),
                },
                600: {
                    slidesPerView: this.forMe(3,600),
                    slidesPerGroup: this.forMe(3, 600),
                },
                768: {
                    slidesPerView: this.forMe(3, 768),
                    slidesPerGroup: this.forMe(3, 768),
                },
                960: {
                    slidesPerView: this.forMe(2, 960),
                    slidesPerGroup: this.forMe(2, 960)
                },
                1024: {
                    slidesPerView: this.forMe(3, 1024),
                    slidesPerGroup: this.forMe(3, 1024),
                },
                1300: {
                    slidesPerView: this.forMe(3, 1300),
                    slidesPerGroup: this.forMe(3, 1300),
                },
                1500: {
                    slidesPerView: this.forMe(4, 1500),
                    slidesPerGroup: this.forMe(4, 1500),
                },
                2000: {
                    slidesPerView: this.forMe(5, 2000),
                    slidesPerGroup: this.forMe(5, 2000),
                },
                2300: {
                    slidesPerView: this.forMe(6, 2300),
                    slidesPerGroup: this.forMe(6, 2300),
                },
                2560: {
                    slidesPerGroup: this.forMe(7, 2560),
                    slidesPerView: this.forMe(7, 2560),
                }
            }
        };



    }

    ngOnDestroy(): void {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.

    }


    navigate(product) {
        switch (this.type) {
            case CAROUSEL_TYPE.PRODUCT:
                this.navigateToProduct(product);
                break;
            case CAROUSEL_TYPE.ADV:
                this.navigateToAdv(product.id);
                break;
            case CAROUSEL_TYPE.BUSINESS:
                this.navigateToMerchant(product.merchantId);
                break;
        }
    }

    navigateToProduct({id, merchantIdAlt}) {

        // this.router.routeReuseStrategy.shouldReuseRoute =  () => {
        //     return false;
        // };
        // this.store.dispatch(loadMerchantIDSuccess({id: merchantIdAlt}))
        this.router.navigate(['/products', id, merchantIdAlt]);
    }

    navigateToAdv({id, merchantIdAlt}) {
        // this.store.dispatch(loadMerchantIDSuccess({id: merchantIdAlt}))
        this.router.navigate(['/adv', id]);
    }

    navigateToMerchant(id: string) {
        this.router.navigate(['/store-info', id]);
    }

    goMore(){
        this.more.emit(true)
    }


    showMore(){
        return  {title: UtilsService.toHex('show me more!'), merchantName: UtilsService.toHex('show me more!')}
    }


}
