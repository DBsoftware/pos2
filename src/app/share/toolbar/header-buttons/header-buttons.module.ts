import { NgModule } from '@angular/core';
import { HeaderButtonsComponent } from './header-buttons.component';
import { MaterialModule } from 'src/app/utils/material.module';
import { FatButtonsModule } from '../../fat-buttons/fat-buttons.module';



@NgModule({
  declarations: [HeaderButtonsComponent],
  imports: [
    MaterialModule,
    FatButtonsModule
  ],exports: [HeaderButtonsComponent]
})
export class HeaderButtonsModule { }
