import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryViewComponent } from './category-view.component';
import { MaterialModule } from 'src/app/utils/material.module';
import { ShareModule } from 'src/app/share/share.module';
import { RouterModule } from '@angular/router';

export const routes = [
  {path: '', component: CategoryViewComponent, pathMatch: 'full'},
];

@NgModule({
  declarations: [CategoryViewComponent],
  exports: [CategoryViewComponent],
  imports: [
    RouterModule.forChild(routes),
    MaterialModule,
    ShareModule
  ]
})
export class CategoryViewModule { }
