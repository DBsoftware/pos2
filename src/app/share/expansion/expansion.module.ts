import { NgModule } from '@angular/core';
import { ExpansionComponent } from './expansion.component';
import { MaterialModule } from 'src/app/utils/material.module';
import { CarouselModule } from '../products-carousel/carousel.module';
import { FlatcardModule } from '../flat-card/flatcard.module';
import { FatButtonsModule } from '../fat-buttons/fat-buttons.module';
import { PillButtonModule } from '../pillbutton/pill-button.module';



@NgModule({
  declarations: [ExpansionComponent],
  imports: [
    MaterialModule, 
    FlatcardModule,
    CarouselModule,
    FatButtonsModule,
    PillButtonModule
  ], exports: [ExpansionComponent]
})
export class ExpansionModule { }
