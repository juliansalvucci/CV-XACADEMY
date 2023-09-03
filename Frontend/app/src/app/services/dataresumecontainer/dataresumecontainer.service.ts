import { Injectable } from '@angular/core';
import { IEducation } from 'src/app/interfaces/IEducation';
import { IExperience } from 'src/app/interfaces/IExperience';
import { IProject } from 'src/app/interfaces/IProject';
import { ISkill } from 'src/app/interfaces/ISkill';

@Injectable({
  providedIn: 'root',
})
export class DataresumecontainerService {
  resume = {
    firstName: '',
    lastName: '',
    contactEmail: '',
    contactPhone: '',
    photoUrl: '',
  };

  educationList: IEducation[] = [];
  experienceList: IExperience[] = [];
  projectList: IProject[] = [];
  skillList: ISkill[] = [];
}
