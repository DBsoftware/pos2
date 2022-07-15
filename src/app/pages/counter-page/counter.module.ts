import { NgModule } from '@angular/core';
import { CounterPageComponent } from './counter-page.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/utils/material.module';
import { ShareModule } from 'src/app/share/share.module';


export const routes = [
  {path: '', component: CounterPageComponent, pathMatch: 'full'},
];

@NgModule({
  declarations: [CounterPageComponent],
  imports: [
    RouterModule.forChild(routes),
    MaterialModule,
    ShareModule,
  ],
  exports:[CounterPageComponent]
})
export class CounterModule { }
