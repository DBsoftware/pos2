import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DinamicUrlService {

constructor() { }

buildAux(ParamArray) {
  return ParamArray.filter(e => !!e).reduce((acc, curr, i, arr) => {
    if(i %2 != 0) return acc
    return {...acc,[curr]:arr[i+1]}
  }, {})
}

}
