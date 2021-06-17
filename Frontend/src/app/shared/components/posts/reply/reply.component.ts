import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Post } from '../../../models/post';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent implements OnInit {

  @Input()
  post:Post;

  constructor() { }

  ngOnInit(): void {
  }

  creatingNewPost: boolean = false;

  toggleMessageBox(): void {
    this.creatingNewPost = !this.creatingNewPost
    if(document.getElementById(`${this.post.id}`)){
      document.getElementById(`${this.post.id}`).scrollIntoView({block: "center"});
      document.getElementById(`${this.post.id}`).click();
    }
  }

}
