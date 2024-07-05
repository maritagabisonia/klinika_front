import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  languageChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
    window.addEventListener('storage', (event: StorageEvent) => {
      if (event.key === 'language') {
        console.log('Storage event detected:', event);
        this.languageChange.emit(event.newValue || '');
      }
    });
  }

  setLanguage(language: string): void {
    console.log('Setting language:', language);
    localStorage.setItem('language', language);
    this.languageChange.emit(language); // Emit the event manually as well
  }
}
