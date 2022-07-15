import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { ManagerState } from 'src/app/store';
import { areThereCoordinates } from 'src/app/store/auxiliars/auxiliars.selectors';
import { CAROUSEL_TYPE } from '../static-data';

@Component({
  selector: 'app-big-title',
  templateUrl: './big-title.component.html',
  styleUrls: ['./big-title.component.scss']
})
export class BigTitleComponent implements OnInit {
  CAROUSEL_TYPE = CAROUSEL_TYPE
  @Input() moduleTypeId: string = '83010';
  CoordsExist
  @Input() product: any = {title: ''};
  @Input() type: string = 'PC';


  constructor(private store: Store<ManagerState>) { }

  ngOnInit(): void {

    this.CoordsExist = this.store.select(areThereCoordinates)
    .pipe(
        map(e => e && !!this.product.Distance)
    );
  }


}
