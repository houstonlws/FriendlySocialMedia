import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../../models/post';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpCli: HttpClient) { }

  getAllPosts(): Observable<Post[]>{
    return this.httpCli.get<Post[]>(`http://localhost:9001/api/post`, {withCredentials: true})
  }

  createNewPost(newPost: Post,file: File): Observable<Post>{
    console.log(newPost);
    console.log(newPost.refPost);
    let id = newPost.refPost ? newPost.refPost.id : 0;

    let formData = new FormData();
    formData.append('username',newPost.user.username);
    formData.append('message',newPost.message);
    formData.append('file', file)

    return this.httpCli.post<Post>(`http://localhost:9001/api/post/${id}`, formData, {withCredentials: true})
  }

  updatePost(post: Post, user:User): Observable<Post>{
    return this.httpCli.put<Post>(`http://localhost:9001/api/post/${post.id}/like`, user.id, {withCredentials: true});
  }

  updatePostMessage(post: Post): Observable<boolean>{
    return this.httpCli.put<boolean>(`http://localhost:9001/api/post/update`, post, {withCredentials: true});
  }

  deletePost(post: Post): Observable<boolean>{
    return this.httpCli.delete<boolean>(`http://localhost:9001/api/post/${post.id}`, {withCredentials: true});
  }

}
