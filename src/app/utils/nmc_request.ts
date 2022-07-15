import {DatePipe} from '@angular/common';

export class NmcRequest {
  11
  192
  122.45
  OPTLST
  constructor () {
    const date = new Date()
    this['11'] = new DatePipe('en-US').transform(date, 'MM-dd-yyyy HH:mm:ss.') + this.pad(date.getMilliseconds(), 3) + ' +0000'
    this['192'] = '8f09eaddb545ff7c94b3c7106eede716'
    this['122.45'] = 'en'
    this['OPTLST'] = [];
  }

  pad(num: number, size: number): string {
    let s = num + '';
    while (s.length < size) {
        s = '0' + s;
    }
    return s;
  }

}
