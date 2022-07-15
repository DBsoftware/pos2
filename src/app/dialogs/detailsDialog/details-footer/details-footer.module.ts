import { NgModule } from '@angular/core';
import { DetailsDialogFooterComponent } from './details-footer.component';
import { MaterialModule } from 'src/app/utils/material.module';
import { ShareModule } from 'src/app/share/share.module';



@NgModule({
  declarations: [DetailsDialogFooterComponent],
  imports: [
    MaterialModule,
    ShareModule,

  ],exports: [DetailsDialogFooterComponent]
})
export class DetailsDialogFooterModule { }
