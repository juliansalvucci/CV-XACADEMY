import { Component } from '@angular/core';
import { MENU_ITEMS } from './app.menu.constants';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './app.sidebar.component.html',
  styleUrls: ['./app.sidebar.component.css'],
})
export class AppSidebarComponent {
  menuItems = MENU_ITEMS;

  constructor(
    private authService: AuthService,
    private cookieService: CookieService
  ) {}

  NombreUsuario = this.cookieService.get('userName');

  logOut() {
    this.authService.logout();
  }
}
