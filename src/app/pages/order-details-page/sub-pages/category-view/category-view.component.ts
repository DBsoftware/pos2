import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, map, shareReplay, tap } from 'rxjs/operators';
import { Category } from 'src/app/model/category';
import { ManagerState } from 'src/app/store';
import { selectCategory, selectCollection } from 'src/app/store/items-collection/items-collection.selectors';

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.scss']
})
export class CategoryViewComponent implements OnInit {
  category
  flag
  constructor(private store: Store<ManagerState>) {
  }

  ngOnInit(): void {

    this.category = this.store.select(selectCollection)
    .pipe(
      map(e => !!e && e.length < 2? e[0]: e),
      map(e => !!e &&!!e.PC ? ({...e, PC: e.PC.map((e, i, arr) =>
        i%2==0?([e, arr[i+1]].filter(e => !!e)):null
        ).filter(e => !!e)}): e),
      shareReplay()
        )
  }

}
