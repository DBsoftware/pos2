import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/utils/material.module';
import { ShareModule } from '../../share/share.module';
import { DialogOneComponent } from './dialog-one.component';



@NgModule({
  declarations: [DialogOneComponent],
  imports: [
    MaterialModule,
    ShareModule
  ],
  exports:[DialogOneComponent]
})
export class DialogOneModule { }
