import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { serialize } from 'typescript-json-serializer';
import { NmcRequest } from '../../utils/nmc_request';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  operationTycoon = '101'

  operationDeclaration: any = {}
  public API_PATH = environment.API_URL;

  constructor(protected http: HttpClient) { }

  post(body: NmcRequest) {
    return this.http.post(this.API_PATH, body)
  }

  postNMCRequest(obj) {
    let nmcRequest = new NmcRequest();
    nmcRequest.OPTLST = Array.isArray(obj) ? obj : [obj];
    return this.post(nmcRequest);
}

  setOperationParams(oper, obj, filter?, expected?){
    console.log('request1',expected)
    let operationDeclaration = {}
    operationDeclaration[this.operationTycoon] = oper
    if (!!obj) operationDeclaration['PARAM'] = serialize(obj)
    if (!!filter) operationDeclaration['FILTER'] = filter
    if (!!expected) operationDeclaration['EXPECTED'] = expected
    console.log('request',JSON.stringify(operationDeclaration))
    return operationDeclaration
  }




}
