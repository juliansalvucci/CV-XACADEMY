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
    nombre: [''],
    apellidos: [''],
    correoElectronico: [''],
    telefono: [''],
    dirección: [''],
    codigoPostal: [''],
    localidad: [''],
  });

  register() {
    console.log(this.registerForm.value);
  }
}
