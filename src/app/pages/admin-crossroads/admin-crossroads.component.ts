import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { pipe } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';
import { UserService } from 'src/app/services/utils/user.service';
import { ManagerState } from 'src/app/store';
import { loadUserDepartmentSuccess, loadUserLocationSuccess } from 'src/app/store/user/user.actions';
import { getUserId, getUserState } from 'src/app/store/user/user.selectors';
import { USER_ROUTE, USER_TYPE } from 'src/app/utils/mncTypes-enums';
@UntilDestroy()
@Component({
  selector: 'app-admin-crossroads',
  templateUrl: './admin-crossroads.component.html',
  styleUrls: ['./admin-crossroads.component.scss']
})
export class AdminCrossroadsComponent implements OnInit {
  carrefour : FormGroup
  USER_TYPEs = [
    {value: '61317', label: 'Kitchen'},
    {value: '61318', label: 'Counter'},
    {value: '61319', label: 'Waiter'}

  ]
  user_id = null
  locations = []
  constructor( public formBuilder: FormBuilder,
    public store: Store<ManagerState>,
    public router: Router,
     public _userService: UserService) { }

  ngOnInit(): void {
    this.store.select(getUserState)
    .pipe(filter(e => !!e), untilDestroyed(this))
    .subscribe(e => {
      this.user_id = e.id
      this.locations = e.location_info
    })
    this.carrefour = this.formBuilder.group({
      role: ['',Validators.compose([Validators.required])],
      location: ['', Validators.compose([Validators.required])]
    })

  }

  onSubmit(){
    if(this.carrefour.valid && !!this.user_id){
        let {role:{value: role}, location:{value: location}} = this.carrefour.controls
        this._userService.saveRoleLocation(role, location, this.user_id)
        .subscribe(e => {
          this.store.dispatch(loadUserDepartmentSuccess({data: role}))
          this.store.dispatch(loadUserLocationSuccess({data: location}))
          this.router.navigate([`${this.resolveDepartment(role)}`])
        })
    }
  }

  resolveDepartment(dept){
    return USER_ROUTE[USER_TYPE[dept]]
  }

}
