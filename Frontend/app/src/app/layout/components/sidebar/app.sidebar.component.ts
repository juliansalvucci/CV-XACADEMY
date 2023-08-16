import { Component } from '@angular/core';
import { MENU_ITEMS } from '../../../constants';

@Component({
  selector: 'app-sidebar',
  templateUrl: './app.sidebar.component.html',
  styleUrls: ['./app.sidebar.component.css'],
})
export class AppSidebarComponent {
  menuItems = MENU_ITEMS;
}
