import { NgModule } from '@angular/core';
import { SectionSpaceComponent } from './section-space.component';
import { MaterialModule } from 'src/app/utils/material.module';




@NgModule({
  declarations: [SectionSpaceComponent],
  imports: [ 
    MaterialModule,
  ],exports: [SectionSpaceComponent]
})
export class SectionSpaceModule { }
