import { NgModule } from '@angular/core';
import { SearchSectionComponent } from './search-section.component';
import { MaterialModule } from 'src/app/utils/material.module';
import { ShareModule } from '../share.module';
import { FatButtonsModule } from '../fat-buttons/fat-buttons.module';



@NgModule({
  declarations: [SearchSectionComponent],
  imports: [
    MaterialModule,
    FatButtonsModule
  ],exports: [SearchSectionComponent],
})
export class SearchSectionModule { }
