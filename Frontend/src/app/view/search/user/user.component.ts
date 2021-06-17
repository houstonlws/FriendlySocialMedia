import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input()
  user: User = {
    id: 0,
    username: '',
    password: '',
    email: '',
    firstname: '',
    lastname: '',
    profilePhoto: '',
    dateCreated: ''
  };

  profileURL: string = "";

  constructor() { }

  ngOnInit(): void {
    this.profileURL = "/profile/" + this.user.id;
  }

}
