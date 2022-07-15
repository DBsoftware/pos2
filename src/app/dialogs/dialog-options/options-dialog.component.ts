import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ManagerState } from 'src/app/store';
import { getOptions } from 'src/app/store/Dialogs/dialog.selectors';

@Component({
  selector: 'app-options-dialog',
  templateUrl: './options-dialog.component.html',
  styleUrls: ['./options-dialog.component.scss']
})
export class OptionsDialogComponent implements OnInit {
  buttonsFooter =  [
    {
        label: 'close',
        color: 'hard-red white w-100',
        id:"opt"
    },
]
content

  constructor(private store: Store<ManagerState>, public dialogRef: MatDialogRef<OptionsDialogComponent>) { }

  ngOnInit(): void {
    this.content = this.store.select(getOptions)
  }

  close(){
    this.dialogRef.close()
  }

}
