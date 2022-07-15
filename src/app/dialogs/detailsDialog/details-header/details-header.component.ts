import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { shareReplay, tap } from 'rxjs/operators';
import { ManagerState } from 'src/app/store';
import { getDetails } from 'src/app/store/Dialogs/dialog.selectors';

@Component({
  selector: 'app-details-header',
  templateUrl: './details-header.component.html',
  styleUrls: ['./details-header.component.scss']
})
export class DetailsHeaderComponent implements OnInit {
  product = {averageRating: 3}
  content

  constructor(private store: Store<ManagerState>) { }

  ngOnInit(): void {
    this.content = this.store.select(getDetails).pipe(shareReplay())
  }

  starRating(number){
    number = Number(number)
    number = number > 0 ? number : 1
    return new Array(Math.floor(number)).fill(0)
  }

}
