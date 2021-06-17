import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  username: string = "";

  response: string = "";

  password1: string = "";
  password2: string = "";

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.username = params['username'];
    });
  }

  resetPassword(){
    if(this.password1 === this.password2){
      
      this.userService.resetPassword(this.username,this.password1).subscribe(data => {
        this.response = data === true ? "password has been successfully reset" : "error has occured";
      })
    }else{
        this.response = "passwords must match"
    }

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
