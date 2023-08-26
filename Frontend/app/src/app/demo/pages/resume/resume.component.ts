import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { curriculumService } from 'src/app/services/curriculum.service';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent {
  constructor(private fb: FormBuilder, private service: curriculumService) {}

  registerForm = this.fb.group({
    id: [0],
    firstName: [''],
    lastName: [''],
    contactEmail: [''],
    contactPhone: [''],
    photoUrl: [''],
  });

  register() {
    console.log(this.registerForm.value);
    this.service.alta(this.registerForm.value).subscribe(() => {
      console.log('exito');
    });
  }
}
