import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { API_ROUTES } from 'src/app/routes/api.routes';
import { INTERNAL_ROUTES } from 'src/app/routes/internal.routes';
import { ILogin } from 'src/app/interfaces/ILogin';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loginStatus = new BehaviorSubject<boolean>(this.hasToken());

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {}

  login(login: ILogin) {
    const requestOptions: Object = {
      responseType: 'text',
    };
    return this.http
      .post<string>(API_ROUTES.AUTH.LOGIN, login, requestOptions).subscribe(()=>{
        console.log("TROLO", login)

      })
      /*
      .pipe(
        map((r: string) => {
          this.cookieService.set('token', r);
          this.cookieService.set('userName', login.userName);
          this.setSesion(r);
        })
      );
      */
  }

  private setSesion(authResult: string) {
    this.cookieService.set('token', authResult);
    this.loginStatus.next(true);
  }

  logout() {
    this.loginStatus.next(false);
    this.cookieService.delete('token');
    this.router.navigateByUrl(INTERNAL_ROUTES.AUTH_LOGIN);
  }

  public isLoggedIn(): Observable<boolean> {
    return this.loginStatus.asObservable();
  }

  public getTokenData() {
    if (this.isLoggedIn()) {
      const token = this.cookieService.get('token');
      const data = helper.decodeToken(token);
      return data;
    }
  }

  private hasToken(): boolean {
    return this.cookieService.check('currentUser');
  }
}
