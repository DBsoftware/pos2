import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad, Router, UrlSegment } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { getUserState } from 'src/app/store/user/user.selectors';
import { USER_ROUTE, USER_TYPE } from 'src/app/utils/mncTypes-enums';
import { ManagerState } from '../../store';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate, CanLoad {
  constructor(
    private store: Store<ManagerState>,
    private router: Router
    ){}

  checkId(){
    
        return this.store.select(getUserState)
        .pipe(
          take(1), 
          tap((e:any )=> console.log(e)),
          tap((e:any) => !!e && !!e.department ?  this.router.navigate([`${this.resolveDepartment(e.department)}`]) : null),
          map((e:any )=> !e.department));

  }  
  canActivate(
    route: ActivatedRouteSnapshot,state: RouterStateSnapshot): 
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.checkId()
  }
  canLoad(
    route: Route, segments: UrlSegment[]): 
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.checkId()
  }

  resolveDepartment(dept){
    return USER_ROUTE[USER_TYPE[dept]]
  }


  
}
