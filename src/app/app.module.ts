import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from "@angular/common/http";
import { AgGridModule } from 'ag-grid-angular';
import { AuthModule } from './modules/auth/auth.module';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
export let InjectorInstance: Injector;

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    AuthModule,
    CoreModule,
    SharedModule,
    AgGridModule.withComponents([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private injector: Injector) {
    /**
     * @courtesy: https://stackoverflow.com/questions/49507928/how-to-inject-httpclient-in-static-method-or-custom-class
     * Used to create injectorinstance for Services
     */
    InjectorInstance = this.injector;
  }
}
