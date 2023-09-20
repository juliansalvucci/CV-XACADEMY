import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  constructor(private formBuilder: FormBuilder) {}

  public hide = true;
  public formLogin: FormGroup = new FormGroup({});

  ngOnInit(): void {}

  onLogin(): void {
    console.log('test login');
  }

  buildForm(): void {
    this.formLogin = this.formBuilder.group({
      username: [null, [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      password: [null, [Validators.required]],
    });
  }
}
