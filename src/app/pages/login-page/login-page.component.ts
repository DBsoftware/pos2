import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/utils/user.service';
import {tap, switchMap, map, take} from 'rxjs/operators'
import { ValidatorsService } from 'src/app/services/utils/validators.service';
import { ManagerState } from 'src/app/store';
import { Store } from '@ngrx/store';
import { getUserState } from 'src/app/store/user/user.selectors';
import { ResponseService } from 'src/app/services/api/response.service';
import { USER_ROUTE, USER_TYPE } from 'src/app/utils/mncTypes-enums';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  in = false
  continueAsGuestAvailable = true
  constructor(
              public formBuilder: FormBuilder,
              public router: Router,
              private store: Store<ManagerState>,
              public snackBar: MatSnackBar,
              public _userService: UserService,
              public _responseService: ResponseService,
              public _validatorsService: ValidatorsService,
              ) {
  }
  ngOnInit() {
      this.continueAsGuestAvailable = (!localStorage.getItem('guest') && !localStorage.getItem('token') && !localStorage.getItem('accessToken'))
      this.loginForm = this.formBuilder.group({
          email: ['', Validators.compose([Validators.required, this._validatorsService.emailValidator])],
          password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
      });
  }
  // Aa1#aaaa
  public onLoginFormSubmit(values: Object): void {
      if (this.loginForm.valid) {
        let {email:{value: mail}, password:{value: pass}} = this.loginForm.controls
          this._userService.authenticate(mail,pass, true)
          .pipe(
            map(e => this._responseService.getResultsFromMultipleResponse(e)),
            switchMap(e => this.store.select(getUserState)),
            take(1),
            tap(e => !!e && !!e.token ?  localStorage.setItem('token', e.token) : null),
            tap(e => !!e && !!e.department ?  this.router.navigate([`${this.resolveDepartment(e.department)}`]) : null)
            ).subscribe()
      }
  }

  resolveDepartment(dept){
    return USER_ROUTE[USER_TYPE[dept]]
  }

  ngOnDestroy(){
  }

  goTo(route){
      this.router.navigate(['sign-in',route])
  }

  getGuestinfo(){
      // this._userService.getGuestUserId()
      // .subscribe(e => {
      //     if (e.success) {
      //         this.router.navigate(['/'])
      //     }
      // })
  }

}
