import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/shared/models/post';
import { User } from 'src/app/shared/models/user';
import { PostService } from 'src/app/shared/services/post/post.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.css']
})
export class LikesComponent implements OnInit {

  @Input()
  post:Post;

  user: User = {
    id: 0,
    username: '',
    firstname: '',
    lastname: '',
    password:'',
    email: '',
    dateCreated: '',
    profilePhoto: ''
  };

  constructor(private userService: UserService, private postService: PostService) { }

  ngOnInit(): void {
    this.userService.checkSession().subscribe(data => {
      this.user = data;
      //console.log(this.newPost.user)
    })
  }

  likePost(): void {
    let likedUser:boolean = false;

    for (let u of this.post.likes) {
      if (u.id == this.user.id) {
        likedUser = true;
      }
    }

    if (!likedUser){/*  && this.user.id != this.post.user.id */
      this.post.likes.push(this.user);
      this.postService.updatePost(this.post, this.user).subscribe(data => {
      console.log(data);
    });    
    } else {
      //this.post.likes.splice(this.post.);
    }
    console.log(this.post);

  }

}
