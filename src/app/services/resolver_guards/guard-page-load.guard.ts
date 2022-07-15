import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad, Router, UrlSegment } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { ManagerState } from '../../store';
import { hasMerchantId } from '../../store/user/user.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private store: Store<ManagerState>,
    private router: Router
    ){}

  checkId(){
    
        return this.store.select(hasMerchantId)
        .pipe(take(1), 
        tap(e => !e? this.router.navigate(['/login']): null));

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


  
}
