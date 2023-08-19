import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
})
export class ResumeComponent {
  constructor(private fb: FormBuilder) {}

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
  }
}
