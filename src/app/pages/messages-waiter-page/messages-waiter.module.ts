import { NgModule } from '@angular/core';
import { MessagesWaiterComponent } from './messages-waiter.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/utils/material.module';
import { ShareModule } from 'src/app/share/share.module';
import { ChatComponent } from './chat/chat.component';
import { ChatModule } from './chat/chat.module';

export const routes = [
  {
    path: '', component: MessagesWaiterComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'chat',
        component: ChatComponent},
      { path: 'list',
        loadChildren: () => import(`./message-tile/messages-list.module`).then(m => m.MessagesListModule)  },
    ]
  }
    ,
];

@NgModule({
  declarations: [MessagesWaiterComponent],
  imports: [
    RouterModule.forChild(routes),
    MaterialModule,
    ShareModule,
    ChatModule
  ], exports: [MessagesWaiterComponent]
})
export class MessagesWaiterModule { }
