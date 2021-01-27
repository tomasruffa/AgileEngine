import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
  ) { }

  getToken(): Observable<any> {
    localStorage.removeItem('token');

    return this.http.post(environment.apiUrl + 'auth', { apiKey: "23567b218376f79d9415" })
      .pipe(
        map((data: any) => {
          if (data.token) {
            localStorage.setItem('token', data.token)
            return data.token;
          }
          throw new HttpErrorResponse({ status: 401, statusText: data.errorMessage, error: data.errorType });
        }),
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      )
  }

}
