import { NgModule } from '@angular/core';
import { LongHeaderComponent } from './long-header.component';
import { ButtonsRowComponent } from './buttons-row/buttons-row.component';
import { MaterialModule } from 'src/app/utils/material.module';
import { LongInfoListComponent } from './long-info-list/long-info-list.component';
import { PillButtonModule } from 'src/app/share/pillbutton/pill-button.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ShareModule } from '../share.module';
import { FlatcardModule } from '../flat-card/flatcard.module';
import { FatButtonsModule } from '../fat-buttons/fat-buttons.module';
import { TimerModule } from '../timer/timer.module';



@NgModule({
  declarations: [LongHeaderComponent, ButtonsRowComponent, LongInfoListComponent],
  imports: [
    FlatcardModule,
    FatButtonsModule,
    MaterialModule,
    TimerModule,
    ReactiveFormsModule,
    PillButtonModule
  ], exports: [LongHeaderComponent]
})
export class LongHeaderModule { }
