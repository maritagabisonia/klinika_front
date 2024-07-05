import { Injectable } from '@angular/core';
import { Translate } from '../Models/Transalate';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  dictionary: { [key: string]: string } = {}
  constructor(private http:HttpClient) { }

  get_translate():void{
    this.translate().subscribe({
      next: data => {

      },
      error: err => {
        console.error('Error fetching doctors:', err);
      }
    });

  }
  
  translate(): Observable<{ [key: string]: string }> {
    const language = localStorage.getItem("language");

    let httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };

    return this.http.get<Translate[]>(
      "https://localhost:44364/api/user/translate?language=" + language, 
      httpOptions
    ).pipe(
      map((translations: Translate[]) => {
        this.populateDictionary(translations);
        return this.dictionary;
      })
    );
  }

  private populateDictionary(translations: Translate[]): void {
    this.dictionary = {};  
    translations.forEach(item => {
      this.dictionary[item.code] = item.word;
    });
    console.log(this.dictionary);
  }

  get Dictionary(): { [key: string]: string } {
    return this.dictionary;
  }
  set Dictionary( dictionary: { [key: string]: string }) {
    this.dictionary = dictionary;
  }

}
