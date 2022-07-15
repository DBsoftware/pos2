import { NgModule } from '@angular/core';
import { ManualPayComponent } from './manual-pay.component';
import { MaterialModule } from 'src/app/utils/material.module';
import { PillButtonModule } from 'src/app/share/pillbutton/pill-button.module';



@NgModule({
  declarations: [ManualPayComponent],
  imports: [
    MaterialModule,
    PillButtonModule
  ],
  exports: [ManualPayComponent]
})
export class ManualPayModule { }
