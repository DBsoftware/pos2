import { NgModule } from '@angular/core';
import { TableModule } from './table/table.module';
import { TopBarOneModule } from './table-top-bar-one/top-bar-one.module';
import { RatingStarsModule } from './rating-stars/rating-stars.module';
import { CarouselModule } from './products-carousel/carousel.module';
import { ItemCardModule } from './itemcard/item-card.module';
import { ExpansionModule } from './expansion/expansion.module';
import { CounterFooterModule } from './counter-footer/counter-footer.module';
import { LongHeaderModule } from './long-header/long-header.module';
import { RowsExpandablesModule } from './rowsExpandable/rows-expandables.module';
import { SectionSpaceModule } from './section-space/section-space.module';
import { OrderCardModule } from './order-card/order-card.module';
import { SearchSectionModule } from './search-section/search-section.module';
import { OptionListModule } from './option-list/option-list.module';
import { FlatcardModule } from './flat-card/flatcard.module';
import { PillButtonModule } from './pillbutton/pill-button.module';
import { FatButtonsModule } from './fat-buttons/fat-buttons.module';
import { TimerComponent } from './timer/timer.component';
import { TimerModule } from './timer/timer.module';



@NgModule({
  imports: [
    FlatcardModule,
    TimerModule,
    PillButtonModule,
    FatButtonsModule,
    TableModule,
    TopBarOneModule,
    RatingStarsModule,
    CarouselModule,
    ItemCardModule,
    ExpansionModule,
    CounterFooterModule,
    LongHeaderModule,
    RowsExpandablesModule,
    SectionSpaceModule,
    OrderCardModule,
    SearchSectionModule,
    OptionListModule
  ],
  exports: [
    FlatcardModule,
    TimerModule,
    PillButtonModule,
    FatButtonsModule,
    TableModule,
    TopBarOneModule,
    RatingStarsModule,
    CarouselModule,
    ItemCardModule,
    ExpansionModule,
    CounterFooterModule,
    LongHeaderModule,
    RowsExpandablesModule,
    SectionSpaceModule,
    OrderCardModule,
    SearchSectionModule,
    OptionListModule
  ],
})
export class ShareModule { }
