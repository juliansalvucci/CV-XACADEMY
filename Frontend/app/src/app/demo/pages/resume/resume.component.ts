import { Component } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { IExperience } from 'src/app/interfaces/IExperience';
import { curriculumService } from 'src/app/services/resume/curriculum.service';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css'],
})
export class ResumeComponent {
  constructor(private fb: FormBuilder, private service: curriculumService) {}

  private experiences : IExperience[] | undefined

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

  agregarExperiencia() {
    const experiencesArray = this.resumeForm.get('experiences') as FormArray;
    const newExperienceForm = this.experiences; // Crear una nueva instancia del formulario de experiencia
    experiencesArray.push(newExperienceForm);
  }
  

  register() {
    console.log(this.experienceForm);
    
    this.agregarExperiencia();
    console.log(this.resumeForm.value);
    /*
    this.service.alta(this.resumeForm.value).subscribe(() => {
      console.log('exito');
    });
    */
  }
}
