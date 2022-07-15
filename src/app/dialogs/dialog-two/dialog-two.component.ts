import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { switchMap, take } from 'rxjs/operators';
import { ButtonPillsService } from 'src/app/services/buttons/button-pills.service';
import { ManagerState } from 'src/app/store';
import { getCustomerState } from 'src/app/store/customer/customer.selectors';
import { isACustomer } from 'src/app/store/tables/table-three/table-three.selectors';
@UntilDestroy()
@Component({
  selector: 'app-dialog-two',
  templateUrl: './dialog-two.component.html',
  styleUrls: ['./dialog-two.component.scss']
})
export class DialogTwoComponent implements OnInit {
  comment
  isACostumer
  actionButtons = [
    {id: 'customer',label: 'Cancel', color: 'hard-red white w-100'},
    {id: 'customer',label: 'Submit', color: 'hard-green white w-100'},
]

  constructor(
    private store: Store<ManagerState>,
    private _pills:ButtonPillsService,
    public dialogRef: MatDialogRef<DialogTwoComponent>) { 

  }

  ngOnInit(): void {
    this._pills.closeSubjectObservable()
    .pipe(take(1), untilDestroyed(this))
    .subscribe(e => this.dialogRef.close())
    this.isACostumer = this.store.select(getCustomerState)
    .pipe(switchMap(e =>  this.store.select(isACustomer,{id: e.customer_phone_number})))
  }

}
