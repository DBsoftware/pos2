import { NgModule } from '@angular/core';
import { ItemDetailComponent } from './item-detail.component';
import { MaterialModule } from 'src/app/utils/material.module';
import { ItemDetailsHeaderModule } from './item-details-header/item-details-header.module';
import { ShareModule } from 'src/app/share/share.module';
import { ItemDetailsFooterModule } from './item-details-footer/item-details-footer.module';
import { RouterModule } from '@angular/router';

export const routes = [
  {path: '', component: ItemDetailComponent, pathMatch: 'full'},
];


@NgModule({
  declarations: [ItemDetailComponent],
  exports: [ItemDetailComponent],
  imports: [
    RouterModule.forChild(routes),
    MaterialModule,
    ShareModule,
    ItemDetailsHeaderModule,
    ItemDetailsFooterModule
  ]
})
export class ItemDetailModule { }
