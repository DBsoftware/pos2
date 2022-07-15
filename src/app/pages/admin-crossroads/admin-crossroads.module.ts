import { NgModule } from '@angular/core';
import { AdminCrossroadsComponent } from './admin-crossroads.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/utils/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const routes = [
  {path: '', component: AdminCrossroadsComponent, pathMatch: 'full'},
];

@NgModule({
  declarations: [AdminCrossroadsComponent],
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminCrossroadsModule { }
