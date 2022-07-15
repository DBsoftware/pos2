import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';
import { loadChats } from './chat.actions';
import { ChatService } from './chat.service';



@Injectable()
export class ChatEffects {



  constructor(private actions$: Actions, private _chatService :ChatService) {}

  loadActive$ = createEffect(() =>
  this.actions$.pipe(
    ofType(loadChats),
    switchMap(({data}: any) =>
    this._chatService.getChatConversation(data)
    )
  ), { dispatch: false }
);


}
