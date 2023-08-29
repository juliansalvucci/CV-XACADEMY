import { Component } from '@angular/core';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styles: [
    `
      .layout-preview {
        width: 100%;
        height: 100vh;
        background-color: #fff;
        padding: 2rem;
        overflow-y: auto;
        box-shadow: inset 0px 0px 0px 60px rgba(0, 0, 0, 0.1);
      }
    `,
  ],
})
export class PreviewComponent {
  constructor() {}
}
