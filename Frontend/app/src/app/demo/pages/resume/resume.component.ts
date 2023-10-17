import { FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { curriculumService } from 'src/app/services/resume/curriculum.service';
import { DataresumecontainerService } from 'src/app/services/dataresumecontainer/dataresumecontainer.service';
import { IEducation } from 'src/app/interfaces/IEducation';
import { IExperience } from 'src/app/interfaces/IExperience';
import { IProject } from 'src/app/interfaces/IProject';
import { ISkill } from 'src/app/interfaces/ISkill';
import { CookieService } from 'ngx-cookie-service';
import { environment as ENV } from 'src/app/enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { IResume } from 'src/app/interfaces/IResume';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css'],
})
export class ResumeComponent {
  panelOpenState = false;
  editar = false;
  userId = parseInt(this.cookieService.get('userId'));
  resumeId = parseInt(this.cookieService.get('lastResumeId')) + 1;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private cookieService: CookieService,
    private resumeService: curriculumService,
    public dataresumecontainerService: DataresumecontainerService
  ) {}

  ngOnInit() {
    if (this.dataresumecontainerService?.resumeEdit?.id != undefined) {
      this.editar = true;
      this.populateResume();
      this.writeResume();
    } else {
      this.resumeForm.value.title = `SIN TÍTULO ${this.resumeId}`;
    }
  }

  ngOnDestroy() {
    this.resumeForm.reset();
    this.educationForm.reset();
    this.experienceForm.reset();
    this.projectForm.reset();
    this.skillForm.reset();
    this.dataresumecontainerService.resume.firstName = "";
    this.dataresumecontainerService.resume.lastName = "";
    this.dataresumecontainerService.resume.contactEmail = "";
    this.dataresumecontainerService.resume.contactPhone = "";
    this.dataresumecontainerService.resumeEdit = this.resumeForm
      .value as IResume;
    this.dataresumecontainerService.educationList = [];
    this.dataresumecontainerService.experienceList = [];
    this.dataresumecontainerService.projectList = [];
    this.dataresumecontainerService.skillList = [];
  }

  resumeForm = this.fb.group({
    id: [0],
    userId: [this.userId],
    title: [`SIN TÍTULO ${this.resumeId}`],
    firstName: ['', [Validators.pattern('^[a-zA-Z ]+$')]],
    lastName: ['', [Validators.pattern('^[a-zA-Z ]+$')]],
    contactEmail: ['', [Validators.email]],
    contactPhone: ['', [Validators.pattern('^[0-9 ]+$')]],
    experiences: this.fb.array([]),
    projects: this.fb.array([]),
    skills: this.fb.array([]),
    educations: this.fb.array([]),
  });

  educationForm = this.fb.group({
    institution: [''],
    degree: [''],
    startDate: [''],
    endDate: [''],
    description: [''],
    resumeId: [this.resumeId],
  });

  experienceForm = this.fb.group({
    jobTitle: [''],
    company: [''],
    startDate: [''],
    endDate: [''],
    description: [''],
    resumeId: [this.resumeId],
  });

  projectForm = this.fb.group({
    projectName: [''],
    description: [''],
    startDate: [''],
    endDate: [''],
    resumeId: [this.resumeId],
  });

  skillForm = this.fb.group({
    skillName: [''],
    resumeId: [this.resumeId],
  });

  populateResume() {
    this.resumeForm.patchValue({
      id: this.dataresumecontainerService.resumeEdit.id,
      userId: this.dataresumecontainerService.resumeEdit.userId,
      title: this.dataresumecontainerService.resumeEdit.title,
      firstName: this.dataresumecontainerService.resumeEdit.firstName,
      lastName: this.dataresumecontainerService.resumeEdit.lastName,
      contactEmail: this.dataresumecontainerService.resumeEdit.contactEmail,
      contactPhone: this.dataresumecontainerService.resumeEdit.contactPhone,
    });
    this.resumeId = this.dataresumecontainerService.resumeEdit.id;
    this.dataresumecontainerService.educationList =
      this.dataresumecontainerService.resumeEdit.Education;
    this.dataresumecontainerService.experienceList =
      this.dataresumecontainerService.resumeEdit.Experiences;
    this.dataresumecontainerService.projectList =
      this.dataresumecontainerService.resumeEdit.Projects;
    this.dataresumecontainerService.skillList =
      this.dataresumecontainerService.resumeEdit.Skills;
  }

  writeResume() {
    this.dataresumecontainerService.resume.firstName =
      this.resumeForm.get('firstName')?.value || '';
    this.dataresumecontainerService.resume.lastName =
      this.resumeForm.get('lastName')?.value || '';
    this.dataresumecontainerService.resume.contactEmail =
      this.resumeForm.get('contactEmail')?.value || '';
    this.dataresumecontainerService.resume.contactPhone =
      this.resumeForm.get('contactPhone')?.value || '';
  }

  addEducation() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas agregar esta educación?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Agregar',
      confirmButtonColor: '#3085d6',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataresumecontainerService.educationList.push(
          this.educationForm.value as IEducation
        );
        this.educationForm.reset();
      }
    });
  }

  updateEducation(education: IEducation) {
    this.educationForm.patchValue({
      institution: education.institution,
      degree: education.degree,
      startDate: education.startDate,
      endDate: education.endDate,
      description: education.description,
    });
    this.deleteEducation(education, false);
  }

  deleteEducation(education: IEducation, showConfirmation: boolean = true) {
    if (showConfirmation) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Deseas eliminar esta educación?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        confirmButtonColor: '#3085d6',
        cancelButtonText: 'Cancelar',
        cancelButtonColor: '#d33',
      }).then((result) => {
        if (result.isConfirmed) {
          this.dataresumecontainerService.educationList =
            this.dataresumecontainerService.educationList.filter(
              (e) => e != education
            );
        }
      });
    } else {
      this.dataresumecontainerService.educationList =
        this.dataresumecontainerService.educationList.filter(
          (e) => e != education
        );
    }
  }

  addExperience() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas agregar esta experiencia?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Agregar',
      confirmButtonColor: '#3085d6',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataresumecontainerService.experienceList.push(
          this.experienceForm.value as IExperience
        );
        this.experienceForm.reset();
      }
    });
  }

  updateExperience(experience: IExperience) {
    this.experienceForm.patchValue({
      jobTitle: experience.jobTitle,
      company: experience.company,
      startDate: experience.startDate,
      endDate: experience.endDate,
      description: experience.description,
    });
    this.deleteExperience(experience, false);
  }

  deleteExperience(experience: IExperience, showConfirmation: boolean = true) {
    if (showConfirmation) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Deseas eliminar esta experiencia?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        confirmButtonColor: '#3085d6',
        cancelButtonText: 'Cancelar',
        cancelButtonColor: '#d33',
      }).then((result) => {
        if (result.isConfirmed) {
          this.dataresumecontainerService.experienceList =
            this.dataresumecontainerService.experienceList.filter(
              (e) => e != experience
            );
        }
      });
    } else {
      this.dataresumecontainerService.experienceList =
        this.dataresumecontainerService.experienceList.filter(
          (e) => e != experience
        );
    }
  }

  addProject() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas agregar este proyecto?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Agregar',
      confirmButtonColor: '#3085d6',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataresumecontainerService.projectList.push(
          this.projectForm.value as IProject
        );
        this.projectForm.reset();
      }
    });
  }

  updateProject(project: IProject) {
    this.projectForm.patchValue({
      projectName: project.projectName,
      description: project.description,
      startDate: project.startDate,
      endDate: project.endDate,
    });
    this.deleteProject(project, false);
  }

  deleteProject(project: IProject, showConfirmation: boolean = true) {
    if (showConfirmation) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Deseas eliminar este proyecto?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        confirmButtonColor: '#3085d6',
        cancelButtonText: 'Cancelar',
        cancelButtonColor: '#d33',
      }).then((result) => {
        if (result.isConfirmed) {
          this.dataresumecontainerService.projectList =
            this.dataresumecontainerService.projectList.filter(
              (e) => e != project
            );
        }
      });
    } else {
      this.dataresumecontainerService.projectList =
        this.dataresumecontainerService.projectList.filter((e) => e != project);
    }
  }

  addSkill() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas agregar esta habilidad?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Agregar',
      confirmButtonColor: '#3085d6',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataresumecontainerService.skillList.push(
          this.skillForm.value as ISkill
        );
        this.skillForm.reset();
      }
    });
  }

  updateSkill(skill: ISkill) {
    this.skillForm.patchValue({
      skillName: skill.skillName,
    });
    this.deleteSkill(skill, false);
  }

  deleteSkill(skill: ISkill, showConfirmation: boolean = true) {
    if (showConfirmation) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Deseas eliminar esta habilidad?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        confirmButtonColor: '#3085d6',
        cancelButtonText: 'Cancelar',
        cancelButtonColor: '#d33',
      }).then((result) => {
        if (result.isConfirmed) {
          this.dataresumecontainerService.skillList =
            this.dataresumecontainerService.skillList.filter((e) => e != skill);
        }
      });
    } else {
      this.dataresumecontainerService.skillList =
        this.dataresumecontainerService.skillList.filter((e) => e != skill);
    }
  }

  operations() {
    if (this.editar) {
      this.updateResume();
    } else {
      this.saveResume();
    }
  }

  updateResume() {
    this.resumeForm.value.educations =
      this.dataresumecontainerService.educationList;

    this.resumeForm.value.experiences =
      this.dataresumecontainerService.experienceList;

    this.resumeForm.value.projects =
      this.dataresumecontainerService.projectList;

    this.resumeForm.value.skills = this.dataresumecontainerService.skillList;

    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas guardar este currículum?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      confirmButtonColor: '#3085d6',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        this.resumeService
          .modificacion(this.resumeForm.value.id, this.resumeForm.value)
          .subscribe(() => {
            this.resumeForm.value.educations?.map((education) => {
              this.saveEducations(education as IEducation);
            });
            this.resumeForm.value.experiences?.map((experience) => {
              this.saveExperiences(experience as IExperience);
            });
            this.resumeForm.value.projects?.map((project) => {
              this.saveProjects(project as IProject);
            });
            this.resumeForm.value.skills?.map((skill) => {
              this.saveSkill(skill as ISkill);
            });
          });
      }
    });
  }

  saveResume() {
    this.resumeForm.value.educations =
      this.dataresumecontainerService.educationList;

    this.resumeForm.value.experiences =
      this.dataresumecontainerService.experienceList;

    this.resumeForm.value.projects =
      this.dataresumecontainerService.projectList;

    this.resumeForm.value.skills = this.dataresumecontainerService.skillList;

    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas guardar los cambios?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      confirmButtonColor: '#3085d6',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(this.resumeForm.value);
        this.resumeService.alta(this.resumeForm.value).subscribe(() => {
          this.resumeForm.value.educations?.map((education) => {
            this.saveEducations(education as IEducation);
          });
          this.resumeForm.value.experiences?.map((experience) => {
            this.saveExperiences(experience as IExperience);
          });
          this.resumeForm.value.projects?.map((project) => {
            this.saveProjects(project as IProject);
          });
          this.resumeForm.value.skills?.map((skill) => {
            this.saveSkill(skill as ISkill);
          });
        });
      }
    });
  }

  saveEducations(education: IEducation) {
    this.http
      .post<IEducation>(
        `${ENV.apiUrl}/resume/${this.resumeId}/education`,
        education
      )
      .subscribe(() => {
        console.log('EDUCACIÓN REGISTRADA CON ÉXITO');
      });
  }

  saveExperiences(experience: IExperience) {
    this.http
      .post<IEducation>(
        `${ENV.apiUrl}/resume/${this.resumeId}/experience`,
        experience
      )
      .subscribe(() => {
        console.log('EXPERIENCIA REGISTRADA CON ÉXITO');
      });
  }

  saveProjects(project: IProject) {
    this.http
      .post<IEducation>(
        `${ENV.apiUrl}/resume/${this.resumeId}/project`,
        project
      )
      .subscribe(() => {
        console.log('PROYECTO REGISTRADO CON ÉXITO');
      });
  }

  saveSkill(skill: ISkill) {
    this.http
      .post<ISkill>(`${ENV.apiUrl}/resume/${this.resumeId}/skill`, skill)
      .subscribe(() => {
        console.log('HABILIDAD REGISTRADA CON ÉXITO');
      });
  }
}
