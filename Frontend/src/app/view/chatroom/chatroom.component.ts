import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'src/app/shared/models/message';
import { UserService } from 'src/app/shared/services/user.service';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { User } from 'src/app/shared/models/user';

export interface UserMessage{
  'username': string,
  'message': string
}

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit, OnDestroy {
  
  webSocketEndPoint: string = "http://localhost:9001/api/ws";
  topic: string = "/topic/messages"
  stompClient: any;
  
  /* list of all messages in chat */
  messages: Message[] = [];

  message: Message ={
    message: "",
    username: "",
    date: null,
    isSessUser: false
  };

  /* check is message is coming from session user */
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


  constructor(private UserService: UserService, private router: Router) {
   }
 
  ngOnInit(): void {
    /* get any messages stored from this session */
    this.messages = this.UserService.getMessages();

    /* get session */
    this.UserService.checkSession().subscribe(data => {
      console.log(data)
      /* go to login if not logged in */
      if(!data) 
        this.router.navigate(['login']);
      else{
        this.sessUser = data;
        this.message.username = this.sessUser.username;
        this.connect();
      }
    })

  }

/* destroy connection and save messages from this chat */
  ngOnDestroy(): void{
    this.UserService.saveMessages(this.messages);
    this.disconnect();
  }

/* connect to the websocket  */
  connect(){
    console.log("start web socket connection");
    let ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    const _this = this;
    _this.stompClient.connect({}, frame => {
      _this.stompClient.subscribe(this.topic, sdkEvent => {

        _this.handleMessage(sdkEvent)
      })
    }, this.errorCallBack)
  }

  /* disconnect from the websocket */
  disconnect(){
    if(this.stompClient !== null){
      this.stompClient.disconnect();
    }
    console.log("disconnected")
  }

  /* send message to websocket */
  sendMessage(){
    console.log("calling out api via websocket")
    this.stompClient.send("/app/chat", {}, JSON.stringify(this.message));
    this.message.message = '';
  }


  /* receive any messages coming from other users and add to message array */
  handleMessage(message) {
    console.log("Message Received from Server :: " + message)
    let newMessage = JSON.parse(message.body)
    newMessage.isSessUser = this.sessUser.username === newMessage.username;
    this.messages.push(newMessage)
    console.log(this.messages)
  }

  /* console log if errors occur */
  errorCallBack(error) {
    console.log("errorCallBack -> " + error)
    setTimeout(() => {
        this.connect();
    }, 5000);
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
