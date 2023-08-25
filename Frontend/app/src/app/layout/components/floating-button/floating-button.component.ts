import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-floating-button',
  template: `
    <div class="floating-button" (click)="handleRoute()">
      <svg
        width="22px"
        height="22px"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        color="#000000"
      >
        <path
          d="M4 12V2.6a.6.6 0 01.6-.6h11.652a.6.6 0 01.424.176l3.148 3.148A.6.6 0 0120 5.75V21.4a.6.6 0 01-.6.6H11"
          stroke="#000000"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
        <path
          d="M16 2v3.4a.6.6 0 00.6.6H20M1.992 19h3m3 0h-3m0 0v-3m0 3v3"
          stroke="#000000"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </svg>
    </div>
  `,
  styles: [
    `
      .floating-button {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background-color: #fff;
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
        cursor: pointer;
        transition: all 0.3s ease-in-out;
      }

      .floating-button:hover {
        transform: scale(1.1);
      }

      .floating-button svg {
        width: 22px;
        height: 22px;
        margin: 16px;
        color: #000000;
      }
    `,
  ],
})
export class FloatingButtonComponent {
  constructor(private router: Router) {}

  handleRoute() {
    this.router.navigate(['app/resumes']);
  }
}
