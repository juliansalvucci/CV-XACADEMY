import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `
    <div class="loader-container">
      <div class="loader"></div>
      <p class="loader-text">Cargando...</p>
    </div>
  `,
  styles: [
    `
      .loader-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        flex-direction: column;
        gap: 2rem;
        color: #000000;
      }

      .loader {
        border: 5px solid #1f53ff;
        border-top: 5px solid #b1c3ff;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        animation: spin 2s linear infinite;
      }

      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `,
  ],
})
export class AppLoadingComponent {
  constructor() {}
}
