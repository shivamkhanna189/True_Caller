import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { ListComponent } from './list/list.component';
import { HomeRouting } from './home-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [HomeComponent, ListComponent],
  imports: [
    CommonModule,
    HomeRouting,
    SharedModule
  ]
})
export class HomeModule { }
