import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import {UserService} from '../../shared/services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  //References the 'confirm password' form field
  @ViewChild('password2')
  password2: ElementRef;

   //References the div surrounding the form
   @ViewChild('registrationForm')
   registerForm: ElementRef;

  //A user object to put field values into and send to the server
  userInsert: User = {
    id: null,
    username: '', 
    password:'', 
    firstname: '', 
    lastname: '', 
    email: '',
    dateCreated: null,
    profilePhoto: null
  }

  loading: boolean = false;

  //Adds UserService dependency and Router dependency
  constructor(private userServ: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  /* 
    This boolean is property bound to submit button's 'disabled' attribute,
    the button will stay disabled if this is false. canSubmit() changes it.
  */
  ready: boolean = false;

  /* 
    This function runs on the keyup state of any element in the form, it will set the 
    ready boolean to null if there are no empty fields and the passwords match
  */
  canSubmit(): void {
    if( this.userInsert.username != '' && 
    this.userInsert.password != '' && 
    this.userInsert.firstname != '' && 
    this.userInsert.lastname != '' && 
    this.userInsert.email != '' &&
    this.userInsert.password == this.password2.nativeElement.value){
      this.ready = true;
    }
    else{
      this.ready = false;
    }
  }

  //Property bound to passwords dont match message (The 'hidden' property)
  passwordsMatch: boolean = false;

  /* 
    This will check to see if the passwords entered match, if they dont, it will add
    the 'invalid' class to the input field (which turns it red). 
    This runs on keyup for both of the password fields.
  */
  passwordMatches(){
    //Adds 'invalid' class/message if passwords don't match AND 'confirm password' is not empty
    if(this.userInsert.password != this.password2.nativeElement.value){
      if(this.password2.nativeElement.value != ''){
        this.passwordsMatch = true;
      }
    }
    //Removes 'invalid' class and message if passwords match
    if(this.userInsert.password == this.password2.nativeElement.value){
      this.passwordsMatch=false;
    }
    //Removes 'invalid' class and message if 'confirm password' is empty
    if(this.password2.nativeElement.value == ''){
      this.passwordsMatch=false;
    }
  }

  /* 
    Sends the user object to the endpoint
  */
  register(){
    this.loading = true;
     this.userServ.registerUser(this.userInsert).subscribe(data => {
       if(data==true){
        this.displaySuccess();
       }else{
         this.displayFailure();
       }

       this.loading = false;
     });
  }

  //Response string to display
  response: string = '';

  //Response string color
  responseColor: string = '';

  //Displays success message
  displaySuccess(): void {
    console.log('displaying success');
    this.responseColor = 'green';
    this.response = 'Successfully created account!';
    setTimeout(()=>{
      this.router.navigate(['/login']);
    }, 5000)
  }

  //Displays failure message
  displayFailure(): void{
    console.log('displaying fail');
    this.responseColor = 'red';
    this.response = 'Username or email taken!'
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
