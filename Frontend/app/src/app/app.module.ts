import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//

// import { SharedModule } from 'src/shared/shared/shared.module';
import { AppLayoutModule } from './layout';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    AppLayoutModule,
    // SharedModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
