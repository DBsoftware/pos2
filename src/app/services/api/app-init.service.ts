import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Business } from '../../model/business';
import { GlobalSettings } from '../../model/login';
import { OperationIndex } from '../utils/operations.index';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class AppInitService extends RequestService{

  constructor(protected http: HttpClient, protected spinner: NgxSpinnerService) {
    super(http, spinner)
  }

  Init() {
    return new Promise<void>((resolve, reject) => {
      let global = new GlobalSettings()
      global.global_params = 'PORTAL'
      let aux = [
        this.setOperationParams(OperationIndex.GET_PARAMS, global)
      ]
      if(localStorage.getItem('token')){
        let session = new Business()
        session.token = localStorage.getItem('token')
        aux.push(this.setOperationParams(OperationIndex.GET_PROFILE, session))
      }
      this.postNMCRequest(aux)
      .subscribe(e => {
          resolve()}, err => resolve())
    });
}
}
