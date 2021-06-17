import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/shared/services/theme/theme.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {

  constructor(private themeServ: ThemeService) { }

  /* 
    Theme value
  */
  theme: string = 'theme-1';

  /* 
    Sets theme variable to input
  */
  toggleTheme(theme: string){
    this.theme = theme;
  }

}
