import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs/operators';
import { ManagerState } from 'src/app/store';
import { getPosition } from 'src/app/store/user/user.selectors';
@UntilDestroy()
@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {
  isWaiter
  position
  constructor(private router: Router, private store: Store<ManagerState>) { }

  ngOnInit(): void {
    let url = this.router.url
    this.router.events
      .pipe(untilDestroyed(this),
      filter(event => event instanceof NavigationEnd),
      map((e: NavigationEnd) => e.url))
    .subscribe()
    this.position = this.store.select(getPosition)

  }

}
