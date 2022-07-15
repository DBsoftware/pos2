import { NgModule } from '@angular/core';
import { CounterFooterComponent } from './counter-footer.component';
import { DeliveryInstructionsComponent } from './delivery-instructions/delivery-instructions.component';
import { NotesComponent } from './notes/notes.component';
import { TotalsComponent } from './totals/totals.component';
import { MaterialModule } from 'src/app/utils/material.module';
import { PillButtonModule } from 'src/app/share/pillbutton/pill-button.module';
import { FatButtonsModule } from '../fat-buttons/fat-buttons.module';
import { FlatcardModule } from '../flat-card/flatcard.module';



@NgModule({
  declarations: [
    CounterFooterComponent, 
    DeliveryInstructionsComponent, 
    NotesComponent, 
    TotalsComponent
  ],
  imports: [
    MaterialModule, 
    PillButtonModule,
    FatButtonsModule,
    FlatcardModule
  ],
  exports: [ 
    CounterFooterComponent,  
    DeliveryInstructionsComponent, 
    NotesComponent, 
    TotalsComponent
  ]
})
export class CounterFooterModule { }
