import { Component, OnInit } from '@angular/core';
import { User } from './_models/User';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'FriendsApp-SPA';

  /**
   *
   */
  constructor(private authService: AuthService) {
    
  }
  ngOnInit(){
    const user: User = JSON.parse(localStorage.getItem('user'));

    if(user)
    {
      this.authService.currentUser = user;
      this.authService.changeMemberPhoto(user.photoUrl);
    }
  }

}
