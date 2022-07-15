import {  JsonProperty, Serializable} from 'typescript-json-serializer';
import { General } from './business';
import { hexBoth, padOut } from './hexa';

@Serializable()
export class ImageObject extends General{
  @JsonProperty('119.17')
  image_name = undefined;
}
@Serializable()
export class NmcMessage  extends General   {
    @JsonProperty('122.114')
    id = undefined;
    @JsonProperty({name: '122.128', ...hexBoth})
      subject = undefined; // (hexa)
    @JsonProperty({name: '120.157', ...hexBoth})
      content = undefined; //(hexa)
    @JsonProperty('114.143')
      status = undefined;
    @JsonProperty('53')
      sender = undefined;
    @JsonProperty('114.179')
      receiver = undefined;
    @JsonProperty('123.31')
      assigned = undefined;
    @JsonProperty('114.53')
      assigned_name = undefined;
    @JsonProperty({name: '122.181', ...hexBoth})
      sender_name = undefined;
    @JsonProperty('114.150')
      parent_id = undefined;
    @JsonProperty('114.138')
      date = undefined;
    @JsonProperty('114.139')
      last_date = undefined;
    @JsonProperty('120.16')
      type_id = undefined;
    @JsonProperty('122.25')
      reason_id = undefined;
    @JsonProperty('121.170')
      merchant_logo = undefined;
    @JsonProperty('114.70')
      company_name = undefined;
    @JsonProperty('121.141')
      read_date = undefined;
    @JsonProperty('127.87')
      replied_flag = undefined;
    @JsonProperty('121.75')
      invoice_id = undefined;
    @JsonProperty('123.21')
      playlist_id = undefined;
    @JsonProperty({name: '114.144', ...padOut})
      product_id = undefined;
    @JsonProperty('114.121')
      total_messages = undefined;
    @JsonProperty('114.132')
      unread_messages = undefined;
    @JsonProperty('120.21')
      message_type_id = undefined;
    @JsonProperty('122.41')
      message_name_type_id = undefined
    @JsonProperty('114.9')
      messages_flag: string
    @JsonProperty({name:'114.47', ...padOut})
      location_id: string
    @JsonProperty({name: "MI", type: ImageObject})
      MI: Array<ImageObject>

      get TypeOfMessage(){
          if (!!this.product_id) {
              return 'Item message'
          } else if(!!this.invoice_id) {
              return 'Invoice message'
          } else if(!!this.playlist_id){
              return 'Ad message'
          }
          return 'General message'
      }
    get conversationState(){
      return `${this.unread_messages}/${this.total_messages}`
    }

    setMessages(obj){
      let aux = [
          'sender',
          'messages_flag',
          'parent_id',
          'product_id',
          'invoice_id',
          'playlist_id',
          'receiver'
      ]
      return this.setObject(aux, obj)
  }
    getConvesation(obj){
      let aux = [
          'sender',
          'parent_id',
          'messages_flag',
          'receiver'
      ]
      return this.setObject(aux, obj)
  }
    sendMessages(obj){
      let aux = [
          'location_id',
          'sender',
          'type_id',
          'content',
          'subject',
          'messages_flag',
          'parent_id',
          'product_id',
          'invoice_id',
          'playlist_id',
          'receiver',
          'MI'
      ]
      return this.setObject(aux, obj)
  }
}





