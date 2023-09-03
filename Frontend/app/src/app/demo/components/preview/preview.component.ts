import { Component, Input } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { DataresumecontainerService } from 'src/app/services/dataresumecontainer/dataresumecontainer.service';

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
  constructor(private dataresumecontainerService: DataresumecontainerService) {}

  firstName = 'name';
  lastName = '';
  contactEmail = '';
  contactPhone = '';
  photoUrl = '';

  pollingSubscription!: Subscription;

  ngOnInit() {
    // Inicia el polling cada 5 segundos (5000 ms)
    this.pollingSubscription = interval(10).subscribe(() => {
      this.firstName = this.dataresumecontainerService.resume.firstName;
    });
  }

  ngOnDestroy() {
    // Asegúrate de desuscribirte cuando el componente se destruye
    this.pollingSubscription.unsubscribe();
  }
}
