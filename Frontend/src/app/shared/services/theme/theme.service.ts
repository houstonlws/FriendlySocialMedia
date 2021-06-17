import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  theme: string = 'theme-1';

  constructor() { }

  darkMode(): string{
    if(this.theme=='theme-1'){
      this.theme = 'theme-2';
    }else if(this.theme='theme-2'){
      this.theme = 'theme-1';
    }
    return this.theme;
  }

}
