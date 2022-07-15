import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingStarsComponent } from './rating-stars.component';
import { MaterialModule } from 'src/app/utils/material.module';



@NgModule({
  declarations: [RatingStarsComponent],
  imports: [
    MaterialModule
  ], exports: [RatingStarsComponent]
})
export class RatingStarsModule { }
