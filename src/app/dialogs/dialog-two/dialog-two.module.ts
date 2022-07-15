import { NgModule } from '@angular/core';
import { DialogTwoComponent } from './dialog-two.component';
import { MaterialModule } from 'src/app/utils/material.module';
import { TableModule } from '../../share/table/table.module';
import { FormComponent } from './form/form.component';
import { TableOneComponent } from './table-one/table-one.component';
import { TableTwoComponent } from './table-two/table-two.component';
import { CustomerNotesComponent } from './customer-notes/customer-notes.component';
import { ShareModule } from '../../share/share.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [DialogTwoComponent, FormComponent, TableOneComponent, TableTwoComponent, CustomerNotesComponent],
  imports: [
    FormsModule,
    MaterialModule,
    TableModule,
    ShareModule,
    ReactiveFormsModule
  ],
  exports: [DialogTwoComponent]
})
export class DialogTwoModule { }
