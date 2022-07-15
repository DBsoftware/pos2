import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  clockSubject = new Subject()
  checkSubject = new Subject()
  updateSubject = new  BehaviorSubject(false)
  clockSubjectObservable(){
    return this.clockSubject.asObservable()
  }
  checkSubjectObservable(){
    return this.checkSubject.asObservable()
  }
  updateSubjectObservable(){
    return this.updateSubject.asObservable()
  }
  constructor() {
  }
  static toHex(str){
    console.log('el hex',str)
    if(!str) return str
    try{
      str = unescape(encodeURIComponent(str))
      .split('').map(function(v){
        return v.charCodeAt(0).toString(16)
      }).join('')
    }
    catch(e){
      console.log('invalid text input: ' + str)
      return str
    }
    return str
  }


  static hexToHTMLstring(hex){
    if (!!hex && !!hex.match(/.{1,2}/g) && typeof hex == 'string') {
    return decodeURIComponent('%' + hex.match(/.{1,2}/g).join('%'));
  }
  return hex
  }

  static unhexFields(arrFields, obj) {
    arrFields.forEach(element => {
        obj[element] = UtilsService.hexToHTMLstring(obj[element]);
    });
    return obj;
}
  static hexFields(arrFields, obj) {
    arrFields.forEach(element => {
        obj[element] = UtilsService.toHex(obj[element]);
    });
    return obj;
}


static isEmpty(obj) {
  for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
          return false;
      }
  }
  return true;
}

static pad(num: string, limit): string {
  let s = num + '';
  while (s.length < limit) {
      s = '0' + s;
  }
  return s;
}
static padEleven(num: string): string {
  if (!num) return num
  let s = num + '';
  while (s.length < 11) {
      s = '0' + s;
  }
  return s;
}
static notPadEleven(num: string): string {
  if (!num || isNaN(Number(num))) return num
  let s = Number(num);
  return s + '' ;
}
clock(){
  setInterval(() => {
    // this.checkSubject.next(false)
    // this.checkSubject.next(false)
    this.clockSubject.next(`${UtilsService.pad(moment().hour().toFixed(0), 2)}:${UtilsService.pad(moment().minute().toFixed(0), 2)}:${UtilsService.pad(moment().second().toFixed(0), 2)}`)
    // this.checkSubject.next(false)
    // this.checkSubject.next(false)
    // this.checkSubject.next(false)
  }, 500)
}

static textIt(num: number): string {
  if(!num) return undefined
  return `${num}`;
}
static trim(num: string): string {
  if(!num) return undefined
  return num.trim();
}
static timeIn(aux: string): string {
  if(!aux) return undefined
  return moment(aux, [moment.HTML5_FMT.TIME_SECONDS,'LT']).format('LT');
}
static timeOut(aux: string): string {
  if(!aux) return undefined
  console.log('out', moment(aux, ['LT']).format(moment.HTML5_FMT.TIME_SECONDS))
  return moment(aux, ['LT']).format(moment.HTML5_FMT.TIME_SECONDS);
}
static dateOut(aux: string): string {
  if(!aux) return undefined
  console.log('out',`${moment(aux).format()}`.slice(0,aux.lastIndexOf('T')))
  aux = `${moment(aux).format()}`
  return aux.slice(0,aux.lastIndexOf('T'))
}
static booleanIn(aux: string): boolean {
  if(!aux) return undefined
  return aux.includes('true');
}

}
