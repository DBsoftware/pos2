import { NgModule } from '@angular/core';
import { DetailsContentComponent } from './details-content.component';
import { MaterialModule } from 'src/app/utils/material.module';
import { DetailsDialogFooterModule } from '../details-footer/details-footer.module';
import { OptionListModule } from 'src/app/share/option-list/option-list.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [DetailsContentComponent],
  imports: [
    MaterialModule,
    DetailsDialogFooterModule,
    FormsModule,
    OptionListModule
  ], exports: [DetailsContentComponent]
})
export class DetailsContentModule { }
