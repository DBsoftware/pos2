import { NgModule } from '@angular/core';
import { DetailsHeaderComponent } from './details-header.component';
import { MaterialModule } from 'src/app/utils/material.module';
import { RatingStarsModule } from '../../../share/rating-stars/rating-stars.module';
import { ShareModule } from 'src/app/share/share.module';



@NgModule({
  declarations: [DetailsHeaderComponent],
  imports: [
    MaterialModule,
    ShareModule,
    RatingStarsModule
  ],
  exports: [DetailsHeaderComponent]
})
export class DetailsHeaderModule { }
