import { NgModule } from '@angular/core';
import { OptionsDialogComponent } from './options-dialog.component';
import { MaterialModule } from 'src/app/utils/material.module';
import { OptionListModule } from '../../share/option-list/option-list.module';
import { ShareModule } from '../../share/share.module';



@NgModule({
  declarations: [OptionsDialogComponent],
  exports: [OptionsDialogComponent],
  imports: [
    MaterialModule,
    ShareModule,
    OptionListModule
  ],
})
export class OptionsDialogModule { }
