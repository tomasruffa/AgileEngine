import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  constructor(
    private http: HttpClient,
  ) { }

  getPhotos(page?, id?): Observable<any> {
    return this.http.get(environment.apiUrl + 'images' + (page ? '?page=' + page.toString() : id ? '/${' +  id.toString() + '}': '')).pipe(
      map((data: any) => {
        if (data) {
          return data;
        }
        return data;
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    )
  }
}
