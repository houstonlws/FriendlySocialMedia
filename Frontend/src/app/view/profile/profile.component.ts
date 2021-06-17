import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/shared/models/post';
import { User } from 'src/app/shared/models/user';
import { PostService } from 'src/app/shared/services/post/post.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  /* condition that will let HTML know if able to edit */
  editAllowed: boolean = false;
  formVisibility: boolean = false;

  sessUser: User = {
    id: 0,
    username: '',
    password: '',
    email: '',
    firstname: '',
    lastname: '',
    profilePhoto: '',
    dateCreated: ''
  };
  
  profile: User = {
    id: 0,
    username: '',
    password: '',
    email: '',
    firstname: '',
    lastname: '',
    profilePhoto: '',
    dateCreated: ''
  };

  userPosts: Post[] = [];

  selectedFile: File;

  loading: boolean = false;

 /*  updatedPosts: EventEmitter = new EventEmitter; */


  constructor(private route: ActivatedRoute, private userService: UserService, private postService: PostService) { }

  ngOnInit(): void {
    this.loading = true;
    //check if session user is same as profile user
    this.route.params.subscribe(params => {
      this.profile.id = params['id'];
      //get one user from db given path variable
      this.userService.getOneUser(this.profile.id).subscribe(data => {
        this.profile = data;
        //this.ppFullUrl = `${this.profile.profilePhoto}`;
        console.log(this.profile)
        //give edit access if profile and sessuser are same
        this.userService.checkSession().subscribe(data => {
          console.log(data)
          this.sessUser = data;
          if(this.sessUser){
            this.editAllowed = (this.profile.id === this.sessUser.id);
          }

            this.loading = false;
        })
      })


      this.userService.getAllPostsGivenUserId(this.profile.id).subscribe(posts => {
        this.userPosts = posts;
        console.log(this.userPosts)
      })
    })

    
       
  }

  toggleForm(): void{
    this.formVisibility = !this.formVisibility;
  }

  updateUser(): void{
    console.log(this.profile)
    this.loading = true;
    this.userService.updateUser(this.profile, this.selectedFile).subscribe(data => {
      console.log("TRIGGERINGGGG", data)
      this.profile = data;
      this.formVisibility = false;
      this.loading = false;
    });
  }

  selectFile(e): void{
    this.selectedFile = e.target.files[0];
  }

  getUpdatedPosts(updatedPosts: Array<Post>):void {
    this.userService.getAllPostsGivenUserId(this.profile.id).subscribe(posts => {
      this.userPosts = posts;
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
