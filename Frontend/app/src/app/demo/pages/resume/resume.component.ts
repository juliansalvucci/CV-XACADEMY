import { FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { curriculumService } from 'src/app/services/resume/curriculum.service';
import { DataresumecontainerService } from 'src/app/services/dataresumecontainer/dataresumecontainer.service';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css'],
})
export class ResumeComponent {
  constructor(
    private fb: FormBuilder,
    private service: curriculumService,
    private dataresumecontainerService: DataresumecontainerService
  ) {}

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
    resumeId: [''],
  });

  experienceForm = this.fb.group({
    jobTitle: [''],
    company: [''],
    startDate: [''],
    endDate: [''],
    description: [''],
    resumeId: [''],
  });

  projectForm = this.fb.group({
    projectName: [''],
    description: [''],
    startDate: [''],
    endDate: [''],
    resumeId: [''],
  });

  skillForm = this.fb.group({
    skillName: [''],
    resumeId: [''],
  });

  register() {
    this.dataresumecontainerService.resume.firstName = this.resumeForm.get('firstName')?.value || "";
    console.log(this.experienceForm);
    console.log(this.resumeForm.value);
    /*
    this.service.alta(this.resumeForm.value).subscribe(() => {
      console.log('exito');
    });
    */
  }
}
