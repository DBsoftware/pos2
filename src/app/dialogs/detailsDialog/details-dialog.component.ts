import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { ManagerState } from 'src/app/store';
import { getDetails, getDetailsAuxiliar, getDetailsOpenstate } from 'src/app/store/Dialogs/dialog.selectors';
import { getRow } from 'src/app/store/items/items.selectors';
import { getSelectedOrdernumber } from 'src/app/store/selected-order/selected-order.selectors';
import { DialogOneComponent } from '../dialog-one/dialog-one.component';

@Component({
  selector: 'app-details-dialog',
  templateUrl: './details-dialog.component.html',
  styleUrls: ['./details-dialog.component.scss']
})
export class DetailsDialogComponent implements OnInit {
  row
  orderNumber
  button = {
    label: 'close',
    color: 'hard-red white w-100',
    id:"opt"
}
  constructor(
    public dialogRef: MatDialogRef<DialogOneComponent>,
    private store: Store<ManagerState>
    ) { }
 
  ngOnInit(): void {
    this.orderNumber = this.store.select(getSelectedOrdernumber)
    this.row = this.store.select(getDetailsAuxiliar)
  }


  close(){
    this.dialogRef.close()
  }

    resolveExpandable(){

    }


}
