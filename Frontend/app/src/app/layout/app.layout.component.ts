import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './app.layout.component.html',
  styleUrls: ['./app.layout.component.css'],
})
export class AppLayoutComponent implements OnInit {
  showButton = false;
  isLoading = true;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showButton = event.url !== '/app/resumes';
      }
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 0);
  }
}
