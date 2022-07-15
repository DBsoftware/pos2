import { NgModule } from '@angular/core';
import { DetailsDialogComponent } from './details-dialog.component';
import { MaterialModule } from 'src/app/utils/material.module';
import { DetailsHeaderModule } from './details-header/details-header.module';
import { DetailsDialogFooterModule } from './details-footer/details-footer.module';
import { DetailsContentModule } from './details-content/details-content.module';
import { ExpansionModule } from '../../share/expansion/expansion.module';
import { StoreModule } from '@ngrx/store';
import { ShareModule } from 'src/app/share/share.module';



@NgModule({
  declarations: [DetailsDialogComponent],
  imports: [
    MaterialModule,
    DetailsHeaderModule,
    DetailsContentModule,
    DetailsDialogFooterModule,
    ShareModule,
  ],
  exports: [DetailsDialogComponent]
})
export class DetailsDialogModule { }
