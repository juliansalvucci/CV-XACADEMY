import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { SharedModule } from 'src/shared/shared/shared.module';
import { ResumeComponent } from './demo/pages/resume/resume.component';

@NgModule({
  declarations: [AppComponent, ResumeComponent],
  imports: [AppRoutingModule, AppLayoutModule, SharedModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
