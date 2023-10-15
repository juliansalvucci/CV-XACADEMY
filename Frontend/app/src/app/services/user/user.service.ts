import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of } from 'rxjs';
import { API_ROUTES } from 'src/app/routes/api.routes';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  URL = API_ROUTES.USER;

  findAllResumes(): Observable<any> {
    const userId = this.cookieService.get('userId');
    if (!userId) return of([]);
    return this.http.get(this.URL.CONSULTAPORID + userId);
  }
}
