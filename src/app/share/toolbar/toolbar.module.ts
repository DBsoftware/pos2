import { NgModule } from '@angular/core';
import { ToolbarComponent } from './toolbar.component';
import { DuoInfoComponent } from './duo-info/duo-info.component';
import { MaterialModule } from 'src/app/utils/material.module';
import { RouterModule } from '@angular/router';
import { LogoComponent } from './logo/logo.component';
import { HeaderButtonsModule } from './header-buttons/header-buttons.module';
import { SearchSectionModule } from '../search-section/search-section.module';



@NgModule({
  declarations: [ToolbarComponent,  DuoInfoComponent, LogoComponent],
  imports: [
    MaterialModule, 
    RouterModule,
    HeaderButtonsModule,
    SearchSectionModule
  ],
  exports: [ToolbarComponent,  DuoInfoComponent]
})
export class ToolbarModule { }
