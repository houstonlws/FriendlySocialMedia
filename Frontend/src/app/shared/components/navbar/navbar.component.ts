import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { ThemeService } from '../../services/theme/theme.service';
import {UserService} from '../../services/user.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Output()
  toggleDarkMode: EventEmitter<void> = new EventEmitter<void>();

  defaultUser: User = {
    id: 0,
    username: '',
    firstname: '',
    lastname: '',
    password: '',//Not going to be set for security reasons
    email: '',
    dateCreated: '',
    profilePhoto: ''
  }

  currentUser: User = {
    id: 0,
    username: '',
    firstname: '',
    lastname: '',
    password: '',//Not going to be set for security reasons
    email: '',
    dateCreated: '',
    profilePhoto: ''
  }

  
  formVisibility: boolean

  /* 
    A boolean that keeps track of whether a user is logged in or not
  */
  loggedin: boolean;

  /* 
    Outputs theme service return value to darkMode event emitter
  */
  @Output()
  darkMode: EventEmitter<string> = new EventEmitter<string>();

  /* 
    Stores the router link for the logo
  */
  home: string = '';

  searchVal: string = '';

  /* 
    Stroes router link to profile
  */
   profile: string = '';

  constructor(private userServ: UserService, private router:Router, private themeServ: ThemeService) { }

  ngOnInit(): void {
    this.userServ.checkSession().subscribe(user => {
      if(user==null){
        this.home = "/";
        if(this.loggedin != false){
          this.loggedin = false;
          this.setUser(this.defaultUser);
        }
      }else{
        this.profile = `/profile/${user.id}`;
        this.home = "/feed";
        if(this.loggedin != true){
          this.loggedin = true;
          this.setUser(user);
        }
      }
    });  
  }

  setUser(user: User){
    this.currentUser.id = user.id;
    this.currentUser.username = user.username;
    this.currentUser.firstname = user.firstname;
    this.currentUser.lastname = user.lastname;
    this.currentUser.email = user.email;
    this.currentUser.dateCreated = user.dateCreated;
    this.currentUser.profilePhoto = user.profilePhoto;
  }

  /* 
    Logs a user out of the session
  */
  logout(): void {
     this.userServ.logout().subscribe(data => {
       if(data==true){
         this.loggedin = false;
       }else{
         this.loggedin = true;
       }
     });
  }

  goToSearchPage(){
    console.log(this.searchVal)
    this.router.navigate([`search`],{queryParams: {value: this.searchVal}});
  }

  /* 
    triggers dark mode event emitter
  */
  toggleTheme(){
    this.darkMode.emit(this.themeServ.darkMode());
  }

}
