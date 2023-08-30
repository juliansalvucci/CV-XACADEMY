import { Component, Input } from '@angular/core';

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
      }
    `,
  ],
})
export class PreviewComponent {
  constructor() {}
}
