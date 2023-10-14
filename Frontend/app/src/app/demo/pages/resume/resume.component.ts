import { FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { curriculumService } from 'src/app/services/resume/curriculum.service';
import { DataresumecontainerService } from 'src/app/services/dataresumecontainer/dataresumecontainer.service';
import { IEducation } from 'src/app/interfaces/IEducation';
import { IExperience } from 'src/app/interfaces/IExperience';
import { IProject } from 'src/app/interfaces/IProject';
import { ISkill } from 'src/app/interfaces/ISkill';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css'],
})
export class ResumeComponent {
  panelOpenState = false;
  userId = parseInt(this.cookieService.get('userId'));

  constructor(
    private fb: FormBuilder,
    private cookieService: CookieService,
    private resumeService: curriculumService,
    public dataresumecontainerService: DataresumecontainerService
  ) {}

  ngOnDestroy() {
    this.resumeForm.reset();
    this.educationForm.reset();
    this.experienceForm.reset();
    this.projectForm.reset();
    this.skillForm.reset();

    this.dataresumecontainerService.educationList = [];
    this.dataresumecontainerService.experienceList = [];
    this.dataresumecontainerService.projectList = [];
    this.dataresumecontainerService.skillList = [];
  }

  resumeForm = this.fb.group({
    userId: [this.userId],
    firstName: ['', [Validators.pattern('^[a-zA-Z]+$')]],
    lastName: ['', [Validators.pattern('^[a-zA-Z]+$')]],
    contactEmail: ['', [Validators.email]],
    contactPhone: ['', [Validators.pattern('^[0-9]+$')]],
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
    this.dataresumecontainerService.resume.firstName =
      this.resumeForm.get('firstName')?.value || '';
    this.dataresumecontainerService.resume.lastName =
      this.resumeForm.get('lastName')?.value || '';
    this.dataresumecontainerService.resume.contactEmail =
      this.resumeForm.get('contactEmail')?.value || '';
    this.dataresumecontainerService.resume.contactPhone =
      this.resumeForm.get('contactPhone')?.value || '';
    this.dataresumecontainerService.resume.photoUrl =
      this.resumeForm.get('photoUrl')?.value || '';
  }

  addEducation() {
    this.dataresumecontainerService.educationList.push(
      this.educationForm.value as IEducation
    );
    this.educationForm.reset();
  }

  updateEducation(education: IEducation) {
    this.educationForm.patchValue({
      institution: education.institution,
      degree: education.degree,
      startDate: education.startDate,
      endDate: education.endDate,
      description: education.description,
    });
    this.deleteEducation(education);
  }

  deleteEducation(education: IEducation) {
    this.dataresumecontainerService.educationList =
      this.dataresumecontainerService.educationList.filter(
        (e) => e != education
      );
  }

  addExperience() {
    this.dataresumecontainerService.experienceList.push(
      this.experienceForm.value as IExperience
    );
    this.experienceForm.reset();
  }

  updateExperience(experience: IExperience) {
    this.experienceForm.patchValue({
      jobTitle: experience.jobTitle,
      company: experience.company,
      startDate: experience.startDate,
      endDate: experience.endDate,
      description: experience.description,
    });
    this.deleteExperience(experience);
  }

  deleteExperience(experience: IExperience) {
    this.dataresumecontainerService.experienceList =
      this.dataresumecontainerService.experienceList.filter(
        (e) => e != experience
      );
  }

  addProject() {
    this.dataresumecontainerService.projectList.push(
      this.projectForm.value as IProject
    );
    this.projectForm.reset();
  }

  updateProject(project: IProject) {
    this.projectForm.patchValue({
      projectName: project.projectName,
      description: project.description,
      startDate: project.startDate,
      endDate: project.endDate,
    });
    this.deleteProject(project);
  }

  deleteProject(project: IProject) {
    this.dataresumecontainerService.projectList =
      this.dataresumecontainerService.projectList.filter((e) => e != project);
  }

  addSkill() {
    this.dataresumecontainerService.skillList.push(
      this.skillForm.value as ISkill
    );
    this.skillForm.reset();
  }

  updateSkill(skill: ISkill) {
    this.skillForm.patchValue({
      skillName: skill.skillName,
    });
    this.deleteSkill(skill);
  }

  deleteSkill(skill: ISkill) {
    this.dataresumecontainerService.skillList =
      this.dataresumecontainerService.skillList.filter((e) => e != skill);
  }

  saveResume() {
    this.resumeForm.value.educations =
      this.dataresumecontainerService.educationList;

    this.resumeForm.value.experiences =
      this.dataresumecontainerService.experienceList;

    this.resumeForm.value.projects =
      this.dataresumecontainerService.projectList;

    this.resumeForm.value.skills = this.dataresumecontainerService.skillList;

    console.log(this.resumeForm.value);

    this.resumeService.alta(this.resumeForm.value).subscribe((r) => {
      console.log('test', r);
    });
  }
}
