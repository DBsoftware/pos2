import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { shareReplay, tap } from 'rxjs/operators';
import { ManagerState } from 'src/app/store';
import { getOne } from 'src/app/store/Dialogs/dialog.selectors';
import { actionButtons, actionButtons2 } from './static-data';

@Component({
  selector: 'app-dialog-one',
  templateUrl: './dialog-one.component.html',
  styleUrls: ['./dialog-one.component.scss']
})
export class DialogOneComponent implements OnInit {
  actionButtons = actionButtons
  data
  constructor(public dialogRef: MatDialogRef<DialogOneComponent>,private store:Store<ManagerState>) { }
  

  ngOnInit(): void {
    this.data = this.store.select(getOne)
    .pipe(
      tap(e => this.actionButtons = !e.remove_id? this.actionButtons: actionButtons2 ),
      shareReplay()
    )
    
  }

  close(){
    this.dialogRef.close()
  }

}
