import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ManagerState } from 'src/app/store';
import { getReceipt } from 'src/app/store/Dialogs/dialog.selectors';
import { DialogOneComponent } from '../dialog-one/dialog-one.component';

@Component({
  selector: 'app-dialog-receipt',
  templateUrl: './dialog-receipt.component.html',
  styleUrls: ['./dialog-receipt.component.scss']
})
export class DialogReceiptComponent implements OnInit {
  cancelButton = {id: 'receipt',label: 'cancel', color: 'hard-red white w-100'}
  crossroads
  printButton = {label: 'Print', color: 'hard-green white w-100'}
  constructor(public dialogRef: MatDialogRef<DialogOneComponent>,
    private store: Store<ManagerState>
    ) { }

  ngOnInit(): void {
    this.crossroads = this.store.select(getReceipt)
  }
  close(){
    this.dialogRef.close()
  }

}
