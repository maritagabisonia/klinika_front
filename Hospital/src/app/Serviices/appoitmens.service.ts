import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../Models/Event';

@Injectable({
  providedIn: 'root'
})
export class AppoitmensService {

  public appointments:Event[] = [];

  constructor(private http: HttpClient) { }

  getDoctorAppoitments(id: number): Observable<Event[]> {
    console.log(id)

    let httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http.post<Event[]>("https://localhost:44364/api/user/doctor_appoitments?id=" + id, httpOptions);

  }
  

  placeAppoitments(appointment:Event): Observable<any> {

    let httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http.post<any>("https://localhost:44364/api/user/place_appoitments", appointment, httpOptions);
  }

  


  get appointmentsList(): Event[] {
    return this.appointments;
  }
  set appointmentsList( appointments:Event[]) {
    this.appointments = appointments;
  }
}
