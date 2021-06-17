import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  users: Array<User> = null;
  loading: boolean = false;

  constructor(private userService: UserService, private params: ActivatedRoute) { }

  ngOnInit(): void {
    this.loading =true;
    this.params.queryParams.subscribe(params => {
      let value = params['value'];

      this.userService.getSearchResults(value).subscribe(data => {
        this.users = data;
        this.loading = false;
      })
      
  });
    
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
