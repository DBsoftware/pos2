import { NgModule } from '@angular/core';
import { ItemTileComponent } from './item-tile/item-tile.component';
import { MaterialModule } from 'src/app/utils/material.module';
import { TotalSectionModule } from './total-section/total-section.module';
import { RouterModule } from '@angular/router';
import { ShareModule } from 'src/app/share/share.module';
import { ItemListComponent } from './order-view.component';

export const routes = [
  {path: '', component: ItemListComponent, pathMatch: 'full'},
];

@NgModule({
  declarations: [ItemTileComponent, ItemListComponent],
  exports: [ItemTileComponent, ItemListComponent],
  imports: [
    RouterModule.forChild(routes),
    MaterialModule,
    ShareModule, 
    TotalSectionModule
  ]
})
export class OrderViewModule { }
