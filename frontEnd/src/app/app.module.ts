import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { Filtro2Component } from './filtro2/filtro2.component';

@NgModule({
  declarations: [
    AppComponent
    // Remove Filtro2Component from here
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    Filtro2Component // Add it here as an import instead
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
