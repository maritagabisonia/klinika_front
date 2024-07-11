import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LogIn } from '../Models/LogIn';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:44364/api/user/register_user';

  constructor(private http: HttpClient) { }
  LogIn(user: LogIn): Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http.post<any>("https://localhost:44364/api/user/logIn", user , httpOptions);
  };
  registerUser(user: any): Observable<any> {
    const formData = new FormData();
    formData.append('username', user.username);
    formData.append('password', user.password);
    formData.append('email', user.email);
    // Append other form controls as needed
    console.log(formData)


    return this.http.post(this.apiUrl, formData);
  }

}
