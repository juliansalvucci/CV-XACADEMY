import { FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { curriculumService } from 'src/app/services/resume/curriculum.service';
import { DataresumecontainerService } from 'src/app/services/dataresumecontainer/dataresumecontainer.service';
import { IEducation } from 'src/app/interfaces/IEducation';
import { IExperience } from 'src/app/interfaces/IExperience';
import { IProject } from 'src/app/interfaces/IProject';
import { ISkill } from 'src/app/interfaces/ISkill';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css'],
})
export class ResumeComponent {

  panelOpenState = false;

  constructor(
    private fb: FormBuilder,
    private service: curriculumService,
    public dataresumecontainerService: DataresumecontainerService
  ) { }


  resumeForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    contactEmail: ['', [Validators.email]],
    contactPhone: [''],
    photoUrl: [''],
    experiences: this.fb.array([]), // Debes definir esto para representar la lista de experiencias.
    projects: this.fb.array([]), // Debes definir esto para representar la lista de proyectos.
    skills: this.fb.array([]), // Debes definir esto para representar la lista de habilidades.
    educations: this.fb.array([]), // Debes definir esto para representar la lista de educaciones.
  });

  educationForm = this.fb.group({
    institution: [''],
    degree: [''],
    startDate: [''],
    endDate: [''],
    description: [''],
    resumeId: [0],
  });

  experienceForm = this.fb.group({
    jobTitle: [''],
    company: [''],
    startDate: [''],
    endDate: [''],
    description: [''],
    resumeId: [0],
  });

  projectForm = this.fb.group({
    projectName: [''],
    description: [''],
    startDate: [''],
    endDate: [''],
    resumeId: [0],
  });

  skillForm = this.fb.group({
    skillName: [''],
    resumeId: [0],
  });

  writeResume() {
    this.dataresumecontainerService.resume.firstName = this.resumeForm.get('firstName')?.value || "";
    this.dataresumecontainerService.resume.lastName = this.resumeForm.get('lastName')?.value || "";
    this.dataresumecontainerService.resume.contactEmail = this.resumeForm.get('contactEmail')?.value || "";
    this.dataresumecontainerService.resume.contactPhone = this.resumeForm.get('contactPhone')?.value || "";
    this.dataresumecontainerService.resume.photoUrl = this.resumeForm.get('photoUrl')?.value || "";
  }

  addEducation() {
    this.dataresumecontainerService.educationList.push(this.educationForm.value as IEducation)
  }

  addExperience() {
    this.dataresumecontainerService.experienceList.push(this.experienceForm.value as IExperience)
  }

  addProject() {
    this.dataresumecontainerService.projectList.push(this.projectForm.value as IProject)
  }

  addSkill() {
    this.dataresumecontainerService.skillList.push(this.skillForm.value as ISkill)
  }

  saveResume() { 
    this.resumeForm.value.educations?.push(this.dataresumecontainerService.educationList);
    this.resumeForm.value.experiences?.push(this.dataresumecontainerService.experienceList);
    this.resumeForm.value.projects?.push(this.dataresumecontainerService.projectList);
    this.resumeForm.value.skills?.push(this.dataresumecontainerService.skillList);
    
    console.log(this.resumeForm.value);
  }
}
