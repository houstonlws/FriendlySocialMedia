import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Friendly';
  theme: string = 'theme-1';

  darkMode(): void{
    if(this.theme=='theme-1'){
      this.theme='theme-2';
    }else if(this.theme='theme-2'){
      this.theme='theme-1';
    }
  }

}


