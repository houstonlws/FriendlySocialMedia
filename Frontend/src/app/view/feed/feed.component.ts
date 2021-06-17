import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/shared/models/post';
import { User } from 'src/app/shared/models/user';
import { PostService } from 'src/app/shared/services/post/post.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  
  allPosts: Array<Post> 
  loading: boolean = false;

  authenticated: boolean = false;

  constructor(private postService: PostService, private userService: UserService) { }

  ngOnInit(): void {
    this.loading = true;
    this.postService.getAllPosts().subscribe(data => {
      let posts = [];
      for(let post of data){
        if(post.refPost==undefined){
          posts.push(post);
        }
      }
      this.allPosts = posts;
      this.loading = false;
    })

    this.userService.checkSession().subscribe(data => {
      console.log(data);
      if(data != null) this.authenticated = true;
    })
  }

  creatingNewPost: boolean = false;

  toggleMessageBox(): void {
    this.creatingNewPost = !this.creatingNewPost
  }

  getUpdatedPosts(updatedPosts: Array<Post>):void {
    this.postService.getAllPosts().subscribe(posts => {
      this.allPosts = posts;
    })
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
