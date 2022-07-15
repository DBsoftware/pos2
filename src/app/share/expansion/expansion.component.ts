import { Component, Input, OnInit } from '@angular/core';
import { lista } from 'src/app/pages/presentation-page/emulation-data';
import { CAROUSEL_TYPE } from '../itemcard/static-data';
import { UtilsService } from '../../services/utils/utils.service';
import { Category } from 'src/app/model/category';
import { Router } from '@angular/router';
import { PATHORDERDEATILS, PATHS } from 'src/app/utils/mncTypes-enums';
import { ManagerState } from 'src/app/store';
import { Store } from '@ngrx/store';
import { getSelected } from 'src/app/store/selected-order/selected-order.selectors';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { tap } from 'rxjs/operators';
@UntilDestroy()
@Component({
  selector: 'app-expansion',
  templateUrl: './expansion.component.html',
  styleUrls: ['./expansion.component.scss']
})
export class ExpansionComponent implements OnInit {
  @Input() items: Category
  CAROUSEL_TYPE = CAROUSEL_TYPE
  orderSelected
  constructor(private router: Router, private store: Store<ManagerState>) { }

  ngOnInit(): void {
    this.store.select(getSelected)
    .pipe(untilDestroyed(this),
    tap(e => this.orderSelected = e),
    )
    .subscribe()
  }

  navigateViewAll(event){
    event.stopPropagation();
    this.router.navigate([`/${PATHS.ORDER_DETAIL}/${PATHORDERDEATILS.CATEGORY}${this.orderSelected && this.orderSelected.id? ('/'+this.orderSelected.id ):''}/${this.items.category_id}`])
  }

}
