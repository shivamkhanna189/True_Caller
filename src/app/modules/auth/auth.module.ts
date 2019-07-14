import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { AuthRouting } from './auth-routing.module';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    AuthRouting,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule
  ],

  declarations: [AuthComponent,LoginComponent]
})
export class AuthModule { }
