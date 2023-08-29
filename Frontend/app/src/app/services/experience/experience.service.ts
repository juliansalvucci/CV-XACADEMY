import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ROUTES } from 'src/app/routes/apiRoutes';

@Injectable({
  providedIn: 'root',
})
export class ExperienceService {
  constructor(private http: HttpClient) {}

  URL = API_ROUTES.EXPERIENCE;

  alta(data: any): Observable<any> {
    return this.http.post(this.URL.ALTA, data);
  }

  baja(id: number): Observable<any> {
    return this.http.delete(this.URL.BAJA + id);
  }

  modificacion(data: any): Observable<any> {
    return this.http.post(this.URL.MODIFICACION, data);
  }

  consulta(): Observable<any> {
    return this.http.get(this.URL.CONSULTA);
  }

  consultaPorId(id: number): Observable<any> {
    return this.http.get(this.URL.CONSULTAPORID + id);
  }
}
