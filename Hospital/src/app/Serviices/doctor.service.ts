// doctor.service.ts
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private apiUrl = 'https://localhost:44364/api/user';

  constructor(private http: HttpClient) { }

  getDoctors(pageNumber: number, rowsPerPage: number): Observable<any> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('rowsPerPpage', rowsPerPage.toString());

    return this.http.get(`${this.apiUrl}/get_Doctors`, { params });
  }
}
