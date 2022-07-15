import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { shareReplay } from 'rxjs/operators';
import { ManagerState } from 'src/app/store';
import { selectCollection } from 'src/app/store/items-collection/items-collection.selectors';


@Component({
  selector: 'app-rows-expandables',
  templateUrl: './rows-expandables.component.html',
  styleUrls: ['./rows-expandables.component.scss']
})
export class RowsExpandablesComponent implements OnInit {
  list
  constructor(private store: Store<ManagerState>) { 
    
  }

  ngOnInit(): void {
    this.list = this.store.select(selectCollection).pipe(shareReplay())
  }

}
