import { NgModule } from '@angular/core';
import { ItemCardComponent } from './item-card.component';
import { EyeContainerComponent } from './eye-container/eye-container.component';
import { BigTitleComponent } from './bigtitle/big-title.component';
import { ContentComponent } from './content/content.component';
import { FooterComponent } from './footer/footer.component';
import { MaterialModule } from 'src/app/utils/material.module';
import { RatingStarsModule } from '../rating-stars/rating-stars.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';



@NgModule({
  declarations: [ItemCardComponent, EyeContainerComponent, BigTitleComponent, ContentComponent, FooterComponent],
  imports: [
    MaterialModule, 
    RatingStarsModule, 
    LazyLoadImageModule
  ], exports: [ItemCardComponent]

})
export class ItemCardModule { }
