import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { ManagerState } from 'src/app/store';
import { clearActiveChat, loadChats } from 'src/app/store/chat/chat.actions';
import { selectAllMessages } from 'src/app/store/tables/table-messages/messages.selectors';

@Component({
  selector: 'app-message-tiles',
  templateUrl: './message-tile.component.html',
  styleUrls: ['./message-tile.component.scss']
})
export class MessageTileComponent implements OnInit {
  messages = of([])
  constructor(
    private router: Router,
    private store: Store<ManagerState>) { }



  goto(row){
    this.store.dispatch(clearActiveChat())
    this.store.dispatch(loadChats({data: row}))
    this.router.navigate(['mwaiter','chat'])
  }

  ngOnInit(): void {
    this.messages = this.store.select(selectAllMessages)
  }

}
