import { NgModule } from '@angular/core';
import { RowsExpandablesComponent } from './rows-expandables.component';
import { ExpansionModule } from '../expansion/expansion.module';
import { MaterialModule } from 'src/app/utils/material.module';



@NgModule({
  declarations: [RowsExpandablesComponent],
  imports: [
    MaterialModule,
    ExpansionModule
  ],exports:  [RowsExpandablesComponent]
})
export class RowsExpandablesModule { }
