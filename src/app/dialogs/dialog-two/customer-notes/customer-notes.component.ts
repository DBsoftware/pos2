import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { ManagerState } from 'src/app/store';
import { getCustomerNotes } from 'src/app/store/customer/customer.selectors';

@Component({
  selector: 'app-customer-notes',
  templateUrl: './customer-notes.component.html',
  styleUrls: ['./customer-notes.component.scss']
})
export class CustomerNotesComponent implements OnInit {
  notas
  comment
  @Output() content =  new EventEmitter()
  constructor(private store : Store<ManagerState>) { }

  ngOnInit(): void {
    this.notas = this.store.select(getCustomerNotes)
  }

  enterComment(value){
    this.content.emit(value)
  }

}
