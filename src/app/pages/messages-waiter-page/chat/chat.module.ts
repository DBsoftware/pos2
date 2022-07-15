import { NgModule } from '@angular/core';
import { ChatComponent } from './chat.component';
import { MaterialModule } from 'src/app/utils/material.module';
import { ShareModule } from 'src/app/share/share.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ChatComponent],
  imports: [
    MaterialModule,
    ShareModule,
    FormsModule
  ],exports: [ChatComponent]
})
export class ChatModule { }
