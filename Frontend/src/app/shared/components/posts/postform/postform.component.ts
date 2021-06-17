import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from 'src/app/shared/models/post';
import { PostService } from 'src/app/shared/services/post/post.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-postform',
  templateUrl: './postform.component.html',
  styleUrls: ['./postform.component.css']
})
export class PostformComponent implements OnInit {

  newPost: Post = {
    id: 0,
    user: null,
    message: '',
    dateCreated: '',
    refPost: null,
    comments: [],
    likes: null,
    image: ''
  }
  @Input()
  currentPost:Post = null;

  @Output()
  updatedPosts:EventEmitter<Array<Post>> = new EventEmitter<Array<Post>>();

  selectedFile: File;

  loading: boolean = false;


  constructor(private userService: UserService, private postService: PostService) { }

  ngOnInit(): void {
    this.userService.checkSession().subscribe(data => {
      this.newPost.user = data;
      //console.log(this.newPost.user)
    })
  }

  visibilityOfUpload: boolean = false;

  showFileUpload(): void{
    this.visibilityOfUpload = true;
  }

  postNewPost(): void{

    this.newPost.refPost = this.currentPost;
    console.log(this.newPost);

    this.visibilityOfUpload = false;
    //will create new post here
    this.loading = true;
    this.postService.createNewPost(this.newPost, this.selectedFile).subscribe(data => {
      console.log(data)

      this.updatedPosts.emit();
      this.loading = false;

    })

    console.log(this.newPost.message);
    this.newPost.message = ''
  }

  selectFile(e): void{
    this.selectedFile = e.target.files[0];
  }

}
