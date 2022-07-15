import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { ManagerState } from 'src/app/store';
import { getUserState } from 'src/app/store/user/user.selectors';
import { USER_ROUTE, USER_TYPE } from 'src/app/utils/mncTypes-enums';
import { dataButtonLinks } from './static-data';

@Component({
  selector: 'app-presentation-page',
  templateUrl: './presentation-page.component.html',
  styleUrls: ['./presentation-page.component.scss']
})
export class PresentationPageComponent implements OnInit {
  dataButtonLinks: Array<{link: string, label: string}> = dataButtonLinks
  links
  user
  constructor(private store: Store<ManagerState>, private router: Router) { }

  ngOnInit(): void {
    this.links = dataButtonLinks
    this.store.select(getUserState)
    .pipe(
    tap(e => !!e && !!e.department ?  this.router.navigate([`${this.resolveDepartment(e.department)}`]) : null)
    ).subscribe()
  }

  opendialog(){
  }

  resolveDepartment(dept){
    return USER_ROUTE[USER_TYPE[dept]]
  }

}


