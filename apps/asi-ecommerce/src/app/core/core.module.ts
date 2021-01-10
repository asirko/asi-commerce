import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './core.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from './layout/layout.module';

@NgModule({
  declarations: [CoreComponent],
  imports: [CommonModule, BrowserModule, CoreRoutingModule, BrowserAnimationsModule, LayoutModule],
  bootstrap: [CoreComponent],
})
export class CoreModule {}
