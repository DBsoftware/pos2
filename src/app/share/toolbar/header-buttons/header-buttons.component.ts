import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, map, tap } from 'rxjs/operators';
import { PATHORDERDEATILS } from 'src/app/utils/mncTypes-enums';

@UntilDestroy()
@Component({
  selector: 'app-header-buttons',
  templateUrl: './header-buttons.component.html',
  styleUrls: ['./header-buttons.component.scss']
})
export class HeaderButtonsComponent implements OnInit {
  labels = [
    {label: 'Home', classes: 'headerButton white'},
    {label: 'Orders', classes: 'headerButton white'},
    // {classes:'newOrderButton white',label:'New Order'},
    {label:'New Order', classes:'headerButton white'},
    {label:'Menu', classes:'headerButton white'}
  ]
  third = {label: 'Messages', classes: 'headerButton white' }
  constructor(private router: Router) {
    this.checkUrl(this.router.url)
  }

  ngOnInit(): void {
    this.router.events
    .pipe(untilDestroyed(this),
    filter(event => event instanceof NavigationEnd),
    map((e: NavigationEnd) => e.url),
    tap(e => this.checkUrl(e)))
    .subscribe()
  }

  checkUrl(url){
    this.labels = [
      {label: 'Home', classes: 'headerButton white '+(url.includes('hwaiter')? 'active': '')},
      {label: 'Orders', classes: 'headerButton white '+(url.includes('orders')? 'active': '')},
      {label: 'New Order', classes:'headerButton white '+(url.includes(`${PATHORDERDEATILS.NEW_ORDER}`)? 'active': '')},
      {label:'Menu', classes:'headerButton white '+(url.includes('showcase')? 'active': '')}
    ]
    this.third = {label: 'Messages', classes: 'headerButton white '+(url.includes('mwaiter')? 'active': '') }
  }

}
