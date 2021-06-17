import { formatCurrency } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-fpform',
  templateUrl: './fpform.component.html',
  styleUrls: ['./fpform.component.css']
})
export class FpformComponent implements OnInit {

  username: string = "";
  loading: boolean = false;

  @Output()
  vis: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  close(){
   this.vis.emit(false);
  }

  sendForgotEmail(){
    //send here
    this.loading = true;
    this.userService.sendForgotPasswordEmail(this.username).subscribe(data => {
      console.log(data)
      this.loading = false;
    })
  }

}
