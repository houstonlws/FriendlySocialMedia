import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Post } from '../models/post';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  messages: Array<Message> =[];
  

  constructor(private httpCli: HttpClient) { }

  /* 
    Adds a new user to database
  */
  registerUser(newUser: User): Observable<boolean>{
  return this.httpCli.post<boolean>("http://localhost:9001/api/register", newUser, {withCredentials: true});
  }

  /* adding get one user func - KC */

  getOneUser(userId: number): Observable<User>{
    return this.httpCli.get<User>(`http://localhost:9001/api/user/${userId}`, {withCredentials: true})
  }

  /* 
    Checks session to see logged in  
  */
  checkSession(): Observable<User>{
    return this.httpCli.get <User>("http://localhost:9001/api/checkSession", {withCredentials: true})
  }

  /* 
    Logs a user out of the session  
  */
  logout(): Observable<boolean>{
    return this.httpCli.get<boolean>("http://localhost:9001/api/logout", {withCredentials: true});
  }

  /* 
    Logs a user out of the session  
  */
    updateUser(user: User, file: File): Observable<User>{

      let formData = new FormData();
      formData.append('firstname',user.firstname);
      formData.append('lastname',user.lastname);
      formData.append('file', file)

      console.log("updateUSER TRIGGERING")

      return this.httpCli.post<User>(`http://localhost:9001/api/user/${user.id}`, formData, {withCredentials: true});
    }

  loginUser(userCred: User): Observable<boolean>{
    return this.httpCli.post<boolean>("http://localhost:9001/api/login", userCred, {withCredentials: true});
  }

  resetPassword(username: string, password: string): Observable<boolean>{

    let formData = new FormData();
    formData.append("username", username);
    formData.append("password",password);

    return this.httpCli.post<boolean>(`http://localhost:9001/api/user/reset-password`, formData, {withCredentials: true});
  }
  
  sendForgotPasswordEmail(username: string): Observable<boolean>{
    return this.httpCli.get<boolean>(`http://localhost:9001/api/user/forgot-password/${username}`, {withCredentials: true});
  }

  getSearchResults(value: string): Observable<User[]>{
    return this.httpCli.get<User[]>(`http://localhost:9001/api/user/search/${value}`, {withCredentials: true});
  }

  getAllPostsGivenUserId(id: number) : Observable<Post[]>{
    return this.httpCli.get<Post[]>(`http://localhost:9001/api/user/${id}/post`, {withCredentials: true});
  } 


  saveMessages(messages: Array<Message>){
    this.messages = messages;
  }

  getMessages(){
    return this.messages;
  }
}
