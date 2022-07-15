import { Location } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { of, zip } from 'rxjs';
import { delay, distinctUntilChanged, distinctUntilKeyChanged, filter, map, shareReplay, tap, switchMap, take } from 'rxjs/operators';
import { ManagerState } from 'src/app/store';
import { getGlobalParams } from 'src/app/store/auxiliars/auxiliars.selectors';
import { getActiveChat } from 'src/app/store/chat/chat.selectors';
import { getUserState, iswaiter } from 'src/app/store/user/user.selectors';
@UntilDestroy()
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @ViewChild('chatContainer') chatContainer: ElementRef
  auxiliar
  message = {content: '', MI: null}
  chat = of([])
  userInfo
  isWaiter
  image_url_ts

  constructor(
    private store: Store<ManagerState>,
    public location: Location,
    private router: Router
    ) {}

  back(){
    this.location.back()
  }


  downChat(){
      if(this.chatContainer.nativeElement.scrollTop != this.chatContainer.nativeElement.scrollHeight) {
        try {
          this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
        } catch(err) { }
      }
  }

  imageUrlBuilder(image){
    if(image.includes('.jp')){
      return `${this.image_url_ts}${image}`
    }
    return 'data:image/jpeg;base64,' + image
  }

  open(image_name){
    if (image_name.includes('.jp')) {
      window.open(`${this.image_url_ts}${image_name}`, "_blank");
    }
  }

  ngOnInit(): void {
    this.store.select(getGlobalParams)
    .pipe(
      filter(e => !!e),
      filter(({IMAGE_URL_MESSAGES} )=> !!IMAGE_URL_MESSAGES),
      map(({IMAGE_URL_MESSAGES} )=> IMAGE_URL_MESSAGES),tap(e => this.image_url_ts = e),
      take(1),
      ).subscribe()
    this.chat = this.store.select(getActiveChat)
    .pipe(shareReplay())
    this.store.select(getUserState)
    .pipe(
      tap(e => this.userInfo = e),
      untilDestroyed(this)
      )
    .subscribe()
    this.isWaiter = this.store.select(iswaiter)

  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.store.select(getActiveChat)
    .pipe(delay(10))
    .subscribe(e => this.downChat())

  }

  isGif(content){
    return content.includes('.gif') && content.includes('https://')
  }

  isUser(value){
    return value.sender.includes(this.userInfo.merchant_id)
  }

  sendResponse(){
    this.message.content = ''


  }


}


