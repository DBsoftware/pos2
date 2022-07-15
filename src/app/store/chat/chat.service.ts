import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { of, zip } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Business } from 'src/app/model/business';
import { NmcMessage } from 'src/app/model/nmc_message';
import { RequestService } from 'src/app/services/api/request.service';
import { OperationIndex } from 'src/app/services/utils/operations.index';
import { ManagerState } from '..';
import { getMerchantId, getUserState } from '../user/user.selectors';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private store: Store<ManagerState>, private _requestService:RequestService) { }

   getChatConversation(chat){
    console.log('hello', chat)
    return zip(this.store.select(getUserState), this.store.select(getMerchantId))
    .pipe(switchMap(([e, i]) =>
      this._requestService.buildRequest(this.chatOperations(chat, e.location_id, i,e.id))
    ))
  }

  chatOperations(chat, location_id, merchant_id,user_id = undefined){
    console.log('locacion', location_id)
    return [
      {
      operation: OperationIndex.GET_CHAT_CONVERSATION,
      plain: new NmcMessage().getConvesation({...chat,receiver: merchant_id, messages_flag: 'false', sender: undefined}),
      // filter:this._requestService.filterLocation(location_id,  user_id, merchant_id),
      expected:'ALL'
      },
    ]
  }

}
