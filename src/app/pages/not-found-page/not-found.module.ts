import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found.component';
import { MaterialModule } from 'src/app/utils/material.module';
import { RouterModule } from '@angular/router';


export const routes = [
  {path: '', component: NotFoundComponent, pathMatch: 'full'},
];


@NgModule({
  declarations: [NotFoundComponent],
  exports: [NotFoundComponent],
  imports: [
    RouterModule.forChild(routes),
    MaterialModule
  ]
})
export class NotFoundModule { }
