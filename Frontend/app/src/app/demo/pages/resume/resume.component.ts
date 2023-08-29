import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { curriculumService } from 'src/app/services/curriculum.service';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css'],
})
export class ResumeComponent {
  constructor(private fb: FormBuilder, private service: curriculumService) {}

  resumeForm = this.fb.group({
    id: [0],
    firstName: [''],
    lastName: [''],
    contactEmail: [''],
    contactPhone: [''],
    photoUrl: [''],
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
  })

  register() {
    console.log(this.resumeForm.value);
    this.service.alta(this.resumeForm.value).subscribe(() => {
      console.log('exito');
    });
  }
}
