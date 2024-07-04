import { Injectable } from '@angular/core';
import { Category } from '../Models/Category';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  public Categories:Category[] = [];

  private apiUrl = 'https://localhost:44364/api/user';

  constructor(private http: HttpClient) { }


  get_categories_eng(): Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http.get<any>("https://localhost:44364/api/user/get_categories_eng",httpOptions);
  };
  get_categories_geo(): Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http.get<any>("https://localhost:44364/api/user/get_categories_geo",httpOptions);
  };

  get CategoriesList(): Category[] {
    return this.Categories;
  }
  set CategoriesList( Categories:Category[]) {
    this.Categories =Categories;
    ;
  }
}
