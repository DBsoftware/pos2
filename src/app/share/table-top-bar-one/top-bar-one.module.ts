import { NgModule } from '@angular/core';
import { TableTopBarOneComponent } from './table-top-bar-one.component';
import { MaterialModule } from 'src/app/utils/material.module';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';
import { NewOptionsBarComponent } from './new-options-bar/new-options-bar.component';
import { FatButtonsModule } from '../fat-buttons/fat-buttons.module';
import { PillButtonModule } from '../pillbutton/pill-button.module';
import { FlatcardModule } from '../flat-card/flatcard.module';



@NgModule({
  declarations: [
    TableTopBarOneComponent, 
    SearchComponent, 
    NewOptionsBarComponent],
  imports: [
    MaterialModule, 
    FormsModule,
    FatButtonsModule,
    PillButtonModule,
    FlatcardModule
  ],
  exports: [TableTopBarOneComponent, SearchComponent]
})
export class TopBarOneModule { }
