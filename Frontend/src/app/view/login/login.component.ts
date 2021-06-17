import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user.service';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

response = ''  

  userCred: User = {
    id: null,
    username: '', 
    password:'', 
    firstname: '', 
    lastname: '', 
    email: '',
    dateCreated: null,
    profilePhoto: null
  }

  forgotFormVisibility = false;

  loading: boolean = false;


  constructor(private userServe: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  close(temp: boolean){
    this.forgotFormVisibility = temp;
  }

  loginUser(){
    this.loading = true;
    this.userServe.loginUser(this.userCred).subscribe(data => {
      if(data == true){
        console.log(data);
        this.router.navigate(['/feed']);
      } else {
        this.response = `Sorry, couldn\'t find you. Please try again, or click register if you are a new user.`
      }

      this.loading = false;
    })
  }

  toggleForgotPasswordForm(){
    this.forgotFormVisibility = !this.forgotFormVisibility;
  }

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
