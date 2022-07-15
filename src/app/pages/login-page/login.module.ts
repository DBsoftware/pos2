import { NgModule } from '@angular/core';
import { LoginPageComponent } from './login-page.component';
import { MaterialModule } from 'src/app/utils/material.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const routes = [
  {path: '', component: LoginPageComponent, pathMatch: 'full'},
];

@NgModule({
  declarations: [
    LoginPageComponent
  ],
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  exports:[
    LoginPageComponent
  ]
})
export class LoginModule { }
