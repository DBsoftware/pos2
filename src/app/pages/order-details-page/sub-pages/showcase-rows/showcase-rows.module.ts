import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowcaseRowsComponent } from './showcase-rows.component';
import { MaterialModule } from 'src/app/utils/material.module';
import { ShareModule } from 'src/app/share/share.module';
import { RouterModule } from '@angular/router';

export const routes = [
  {path: '', component: ShowcaseRowsComponent, pathMatch: 'full'},
];

@NgModule({
  declarations: [ShowcaseRowsComponent],
  exports: [ShowcaseRowsComponent],
  imports: [
    RouterModule.forChild(routes),
    MaterialModule,
    ShareModule
  ]
})
export class ShowcaseRowsModule { }
