import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatroomComponent } from './view/chatroom/chatroom.component';
import { FeedComponent } from './view/feed/feed.component';
import { LandingComponent } from './view/landing/landing.component';
import { LoginComponent } from './view/login/login.component';
import { ProfileComponent } from './view/profile/profile.component';
import { RegisterComponent } from './view/register/register.component';
import { ResetPasswordComponent } from './view/reset-password/reset-password.component';
import { SearchComponent } from './view/search/search.component';

const routes: Routes = [{path:"register",component:RegisterComponent},
                        {path:"login",component:LoginComponent},
                        {path:"feed",component:FeedComponent},
                        {path:"profile/:id",component:ProfileComponent},
                        {path:"password-reset/:username",component:ResetPasswordComponent},
                        {path:"search",component:SearchComponent},
                        {path:"chatroom",component:ChatroomComponent},
                        {path:"",component:LandingComponent},
                        {path:"**",component:LandingComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
