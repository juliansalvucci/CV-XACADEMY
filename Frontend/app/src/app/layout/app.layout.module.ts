import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule } from '@angular/router';
import { AppLayoutComponent } from './app.layout.component';
import { AppSidebarComponent } from './components';

@NgModule({
  declarations: [AppLayoutComponent, AppSidebarComponent],
  imports: [BrowserModule, BrowserAnimationsModule, RouterModule],
})
export class AppLayoutModule {}
