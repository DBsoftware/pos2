import { NgModule } from '@angular/core';
import { TotalSectionComponent } from './total-section.component';
import { MaterialModule } from 'src/app/utils/material.module';
import { ShareModule } from 'src/app/share/share.module';



@NgModule({
  declarations: [TotalSectionComponent],
  exports: [TotalSectionComponent],
  imports: [
    MaterialModule,
    ShareModule
  ]
})
export class TotalSectionModule { }
