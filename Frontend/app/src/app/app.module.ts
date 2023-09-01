import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { SharedModule } from 'src/shared/shared/shared.module';
import { ResumeComponent } from './demo/pages/resume/resume.component';
import { PreviewComponent } from './demo/components/preview/preview.component';
import { HomeComponent } from './demo/pages/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    ResumeComponent,
    HomeComponent,
    PreviewComponent,
  ],
  imports: [AppRoutingModule, AppLayoutModule, SharedModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
