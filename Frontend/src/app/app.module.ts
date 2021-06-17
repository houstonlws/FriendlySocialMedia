import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './view/login/login.component';
import { FeedComponent } from './view/feed/feed.component';
import { ProfileComponent } from './view/profile/profile.component';
import { ChatroomComponent } from './view/chatroom/chatroom.component';
import { LandingComponent } from './view/landing/landing.component';
import { RegisterComponent } from './view/register/register.component';
import { UserService } from './shared/services/user.service';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { PostformComponent } from './shared/components/posts/postform/postform.component';
import { PostComponent } from './shared/components/posts/post/post.component';
import { LikesComponent } from './shared/components/posts/likes/likes.component';
import { ResetPasswordComponent } from './view/reset-password/reset-password.component';
import { FpformComponent } from './view/login/fpform/fpform.component';
import { LoadingspinnerComponent } from './shared/components/loadingspinner/loadingspinner.component';
import { ReplyComponent } from './shared/components/posts/reply/reply.component';
import { CommentComponent } from './shared/components/posts/comment/comment.component';
import { SearchComponent } from './view/search/search.component';
import { UserComponent } from './view/search/user/user.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FeedComponent,
    ProfileComponent,
    ChatroomComponent,
    LandingComponent,
    RegisterComponent,
    NavbarComponent,
    PostformComponent,
    PostComponent,
    CommentComponent,
    LikesComponent,
    ResetPasswordComponent,
    FpformComponent,
    LoadingspinnerComponent,
    ReplyComponent,
    SearchComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
