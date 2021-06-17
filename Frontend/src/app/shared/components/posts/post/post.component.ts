import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Post } from 'src/app/shared/models/post';
import { User } from 'src/app/shared/models/user';
import { PostService } from 'src/app/shared/services/post/post.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {

  @Input()
  post: Post = {
    id: 0,
    user: null,
    message: '',
    dateCreated: '',
    refPost: null,
    comments: [],
    likes: [],
    image: ''
  }

  sesUser: User = null
  
  @Output()
  updatedPosts:EventEmitter<Array<Post>> = new EventEmitter<Array<Post>>();


  creatingNewPost: boolean = false;

  editingPost: boolean = true;

  canEdit: boolean = false;

  askToDelete: boolean = false;

  loading: boolean = false;

  constructor(private postServ: PostService, private userServ: UserService) { }

  ngOnInit() {
    this.userServ.checkSession().subscribe(data =>{
      if(data !== null){
        this.sesUser = data;
        if(this.post.user.id == this.sesUser.id){
          this.canEdit = true;
        }
      }
    })
  }

  toggleMessageBox(): void {
    this.creatingNewPost = !this.creatingNewPost
  }

  getUpdatedPosts(updatedPosts: Array<Post>):void {
    this.updatedPosts.emit();
  }
  
  toggleEditing(): void {
    this.editingPost = !this.editingPost;
  }

  updatePost(): void {
    this.toggleEditing();
    this.loading = true;
    this.postServ.updatePostMessage(this.post).subscribe(data =>{
      if(data==true){
        console.log(data);
      }
      this.loading = false;
    })
  }

  toggleAskToDelete(): void{
    this.askToDelete = !this.askToDelete;
  }

  deletePost(): void{
    
    this.toggleAskToDelete();
    this.postServ.deletePost(this.post).subscribe(data =>{
      console.log(data);
      this.updatedPosts.emit();
    })
  }

}
