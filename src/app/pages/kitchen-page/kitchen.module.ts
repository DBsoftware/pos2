import { NgModule } from '@angular/core';
import { KitchenPageComponent } from './kitchen-page.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/utils/material.module';
import { ShareModule } from 'src/app/share/share.module';

export const routes = [
  {path: '', component: KitchenPageComponent, pathMatch: 'full'},
];


@NgModule({
  declarations: [KitchenPageComponent],
  imports: [
    RouterModule.forChild(routes),
    MaterialModule,
    ShareModule,
  ],
  exports:[KitchenPageComponent]
})
export class KitchenModule { }
