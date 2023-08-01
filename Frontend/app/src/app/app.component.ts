import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
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
