import { NgModule } from '@angular/core';
import { PresentationPageComponent } from './presentation-page.component';
import { MaterialModule } from 'src/app/utils/material.module';
import { RouterModule } from '@angular/router';
import { ShareModule } from 'src/app/share/share.module';



@NgModule({
  declarations: [PresentationPageComponent],
  imports: [
    MaterialModule,
    RouterModule,
    ShareModule
  ],
  exports: [PresentationPageComponent]
})
export class PresentationModule { }
