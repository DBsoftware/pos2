import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, shareReplay, take, tap } from 'rxjs/operators';
import { ManagerState } from 'src/app/store';
import { getUserState } from 'src/app/store/user/user.selectors';
import { USER_ROUTE, USER_TYPE } from 'src/app/utils/mncTypes-enums';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  errors
  constructor(public router:Router, private store: Store<ManagerState>) { }

  ngOnInit() {
    this.errors = this.store.select(st => st.auxiliars.errors).pipe(
      take(1),map(e => e.length > 0? e.map(it => it.errors[0]): null), shareReplay())
  }

  public goHome(): void {
    this.store.select(getUserState)
    .pipe(
    tap(e => !!e && !!e.department ?  this.router.navigate([`${this.resolveDepartment(e.department)}`]) : null)
    ).subscribe()
  }

  resolveDepartment(dept){
    return USER_ROUTE[USER_TYPE[dept]]
  }

}
