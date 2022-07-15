import { NgModule } from '@angular/core';
import { MessagesPageComponent } from './messages-page.component';
import { MaterialModule } from 'src/app/utils/material.module';
import { RouterModule } from '@angular/router';
import { ShareModule } from 'src/app/share/share.module';
import { ChatModule } from '../messages-waiter-page/chat/chat.module';

export const routes = [
  {path: '', component: MessagesPageComponent, pathMatch: 'full'},
];

@NgModule({
  declarations: [MessagesPageComponent],
  imports: [
    MaterialModule,
    ShareModule,
    RouterModule.forChild(routes),
    ChatModule,
  ]
})
export class MessagesModule { }
