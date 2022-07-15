import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {
  static emailRegexp = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$/;
  constructor() { }

  static AllMailsValidator(control: FormControl):any{
    if(!(control.value.length == 0) && !(control.value.split(',').map(e => ValidatorsService.emailRegexp.test(e.trim())).reduce((acc, cur) => acc && cur,true)))
      return {invalidAlso :true}
  }

  static alsoValidatorQty(control: FormControl): any{
    if (control.value.split(',').length > 0 &&!(control.value.split(',').length <= 5)) return {invalidAlsoQty: true};
  }

  emailValidator(control: FormControl): { [key: string]: any } {
    var emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    if (control.value && !emailRegexp.test(control.value.toLowerCase())) {
        return {invalidEmail: true};
    }
}
  static emailValidator(control: FormControl): { [key: string]: any } {
    var emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    if (control.value && !emailRegexp.test(control.value.toLowerCase())) {
        return {invalidEmail: true};
    }
}
}
