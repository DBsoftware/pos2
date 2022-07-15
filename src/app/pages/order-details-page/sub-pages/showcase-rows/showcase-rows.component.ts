import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ManagerState } from 'src/app/store';
import { selectShowcase } from 'src/app/store/items-collection/items-collection.selectors';

@Component({
  selector: 'app-showcase-rows',
  templateUrl: './showcase-rows.component.html',
  styleUrls: ['./showcase-rows.component.scss']
})
export class ShowcaseRowsComponent implements OnInit {
  showcase
  constructor(private store: Store<ManagerState>) { }

  ngOnInit(): void {
    this.showcase = this.store.select(selectShowcase)

  }

}
