import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule } from '@angular/router';
import { AppLayoutComponent } from './app.layout.component';
import { AppSidebarComponent } from './components/sidebar/app.sidebar.component';
import { FloatingButtonComponent } from './components/floating-button/floating-button.component';
import { AppLoadingComponent } from './components/loading/app.loading.component';

@NgModule({
  declarations: [
    AppLayoutComponent,
    AppSidebarComponent,
    FloatingButtonComponent,
    AppLoadingComponent,
  ],
  imports: [BrowserModule, BrowserAnimationsModule, RouterModule],
})
export class AppLayoutModule {}
