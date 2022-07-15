import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {GlobalParam} from "../../model/global-param";
import {Category} from '../../model/category';
import { deserialize } from 'typescript-json-serializer';

@Injectable({
    providedIn: 'root'
})
export class AioGlobals {

  public params$: BehaviorSubject<GlobalParam> = new BehaviorSubject(new GlobalParam(null));
  public categories$: BehaviorSubject<Category[]> = new BehaviorSubject([]);

  public searchString: String;


  public setGlobalParam(data){
    const globalParam = new GlobalParam(null);
    if (data) {
        globalParam.IMAGE_URL = data.find(param => param['127.11'] === 'IMAGE_URL')['127.12'];
        globalParam.VIDEO_URL = data.find(param => param['127.11'] === 'VIDEO_URL')['127.12'];
        globalParam.INVOICE_PATH = data.find(param => param['127.11'] === 'INVOICE_URL')['127.12'];
        // globalParam.IMAGE_URL = 'https://aioimages20.z5.web.core.windows.net/images/';
        globalParam.IMAGE_URL_MESSAGES = data.find(param => param['127.11'] === 'MESSAGES_IMAGES_URL')['127.12'];
    }
    return globalParam
  }

  public parseCategories(data){
    return data.map(cat => {
      const category = deserialize(cat, Category);
      category.hasSubCategory = (category.level === '1');
      return category;
  });
  }

  public parseMerchantCategories(data){
    data = data['result']
    return !data || !!data && data.length == 1 && Object.keys(data[0]).length == 0 ? []
    :data.map(e => ({id: e['114.93'], label: e['120.45']})) 
  }



  public linearSlideConfig = {
    'slidesToShow': 4,
    'slidesToScroll': 4,

    responsive: [
      {
        breakpoint: 5000,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
          arrows: true
        }
      },
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          arrows: true
        }
      },
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          arrows: true
        }
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          arrows: true
        }
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  };


  constructor() {
  }


}

