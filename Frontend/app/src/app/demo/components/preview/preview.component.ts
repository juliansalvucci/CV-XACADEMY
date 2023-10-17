import { Component, Input } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { IEducation } from 'src/app/interfaces/IEducation';
import { IExperience } from 'src/app/interfaces/IExperience';
import { IProject } from 'src/app/interfaces/IProject';
import { ISkill } from 'src/app/interfaces/ISkill';
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

  firstName = '';
  lastName = '';
  contactEmail = '';
  contactPhone = '';

  educationList: IEducation[] = [];
  experienceList: IExperience[] = [];
  projectList: IProject[] = [];
  skillList: ISkill[] = [];

  pollingSubscription!: Subscription;

  ngOnInit() {
    this.pollingSubscription = interval(10).subscribe(() => {
      this.firstName = this.dataresumecontainerService.resume.firstName;
      this.lastName = this.dataresumecontainerService.resume.lastName;
      this.contactEmail = this.dataresumecontainerService.resume.contactEmail;
      this.contactPhone = this.dataresumecontainerService.resume.contactPhone;

      this.educationList = this.dataresumecontainerService.educationList || [];
      this.experienceList = this.dataresumecontainerService.experienceList || [];
      this.projectList = this.dataresumecontainerService.projectList || [];
      this.skillList = this.dataresumecontainerService.skillList || [];
    });
  }

  ngOnDestroy() {
    this.pollingSubscription.unsubscribe();
  }
}
