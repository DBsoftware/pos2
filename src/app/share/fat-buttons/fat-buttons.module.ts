import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FatButtonsComponent } from './fat-buttons.component';
import { MaterialModule } from 'src/app/utils/material.module';



@NgModule({
  declarations: [FatButtonsComponent],
  imports: [
    MaterialModule
  ],exports: [FatButtonsComponent]
})
export class FatButtonsModule { }
