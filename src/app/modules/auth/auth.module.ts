import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { AuthRouting } from './auth-routing.module';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    AuthRouting,
    MatInputModule
  ],

  declarations: [AuthComponent,LoginComponent]
})
export class AuthModule { }
