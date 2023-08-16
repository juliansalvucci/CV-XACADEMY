import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppLayoutComponent } from './layout';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: 'app',
          component: AppLayoutComponent,
        },

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
