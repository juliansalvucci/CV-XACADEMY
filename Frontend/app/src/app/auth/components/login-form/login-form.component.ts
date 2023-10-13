import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ILogin } from 'src/app/interfaces/ILogin';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  public hide = true;

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  formLogin = this.fb.group({
    user: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  login() {
    const login: ILogin = this.formLogin.value as ILogin;
    if (login.user != '' && login.password != '') {
      //Si existen entonces hago el post.
      this.authService.login(login);
    }
  }
}
