import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad, Router, UrlSegment } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { getSelectedOrdernumber } from 'src/app/store/selected-order/selected-order.selectors';
import { ManagerState } from '../../store';

@Injectable({
  providedIn: 'root'
})
export class OrderDetialGuard implements CanActivate, CanLoad {
  constructor(
    private store: Store<ManagerState>,
    private router: Router
    ){}

  checkSelected(){
        return this.store.select(getSelectedOrdernumber)
        .pipe(
        take(1), 
        map(e => !!e),
        tap(e => !e? this.router.navigate(['/waiter']): null));
  }  
  canActivate(
    route: ActivatedRouteSnapshot,state: RouterStateSnapshot): 
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.checkSelected()
  }
  canLoad(
    route: Route, segments: UrlSegment[]): 
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.checkSelected()
  }


  
}
