import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { REQUEST_SPINNER } from 'src/app/utils/mncTypes-enums';
import { PostService } from './post.service';

@Injectable({
  providedIn: 'root'
})
export class RequestService extends PostService {

  constructor(protected http: HttpClient, protected spinner?: NgxSpinnerService){
    super(http)
  }

  options(obj){
    return  obj.map( e => this.setOperationParams(e.operation, e.plain, e.filter, e.expected))
  }

  buildRequest(obj, hasLoading = true){
    if(hasLoading) this.spinner.show(REQUEST_SPINNER)
    return this.postNMCRequest(this.options(obj))
  }
  buildRequestWithSubcription(obj, hasLoading = true){
    this.buildRequest(obj, hasLoading)
    .subscribe()
  }

  filterAd(merchant_id){
    return [{'120.148': 'true', 'operator': 'eq'}, {'114.179': merchant_id, 'operator': 'eq'}]
  }
  filterLocation(location_id, user_id, merchant_id){
    return [
      // {"53":merchant_id,"operator":"eq"},
      {'114.47': location_id, 'operator': 'eq'},
      {'114.179': merchant_id, 'operator': 'eq'}
    ]
  }
  filterAssigns( merchant_id){
    return [
      {'114.150': merchant_id, 'operator': 'eq'}
    ]
  }
  filterPromotios( merchant_id){
    return [
      {'114.112': '23', 'operator': 'eq'},
      {'53': merchant_id, 'operator': 'eq'},
    ]
  }

}
