import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Post } from 'src/app/shared/models/post';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input()
  comment: Post = {
    id: null,
    user: null,
    message: '',
    dateCreated: '',
    refPost: null,
    comments: null,
    likes: null,
    image: ''
  };

  authenticated:boolean = false;

  @Output()
  updatedPosts:EventEmitter<Array<Post>> = new EventEmitter<Array<Post>>();

  constructor(private userSerivce: UserService) { }

  ngOnInit(): void {
    this.userSerivce.checkSession().subscribe(data => {
      if(data) this.authenticated = true;
    })
  }

  creatingNewPost: boolean = false;

  toggleMessageBox(): void {
    this.creatingNewPost = !this.creatingNewPost
  }

  onOnChange(): void {
  }

  getUpdatedPosts(updatedPosts: Array<Post>):void {
    console.log("in comment getUpdatedPosts")
    this.updatedPosts.emit();
}
}
