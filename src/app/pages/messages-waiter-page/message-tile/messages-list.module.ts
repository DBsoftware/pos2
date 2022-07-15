import { NgModule } from '@angular/core';
import { MessageTileComponent } from './message-tile.component';
import { MaterialModule } from 'src/app/utils/material.module';
import { ShareModule } from 'src/app/share/share.module';
import { RouterModule } from '@angular/router';
import { BeforePageLoadService } from 'src/app/services/resolver_guards/before-page-load.service';

export const routes = [
  {path: '',
    resolve: {data: BeforePageLoadService},
    component: MessageTileComponent,
    pathMatch: 'full'},
];

@NgModule({
  declarations: [MessageTileComponent],
  exports: [MessageTileComponent],
  imports: [
    RouterModule.forChild(routes),
    MaterialModule,
    ShareModule
  ]
})
export class MessagesListModule { }
