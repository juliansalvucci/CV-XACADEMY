import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { NotfoundComponent } from './demo/pages/notfound/notfound.component';
import { HomeComponent } from './demo/pages/home/home.component';
import { ResumeComponent } from './demo/pages/resume/resume.component';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: 'auth',
          loadChildren: () =>
            import('./auth/auth.module').then((m) => m.AuthModule),
        },
        { path: '', redirectTo: 'app/home', pathMatch: 'full' },
        {
          path: 'app',
          component: AppLayoutComponent,
          children: [
            { path: 'home', component: HomeComponent },
            { path: 'resumes', component: ResumeComponent },
          ],
        },
        { path: 'notfound', component: NotfoundComponent },
        { path: '**', redirectTo: 'notfound' },
      ],
      {
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
        onSameUrlNavigation: 'reload',
      }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
