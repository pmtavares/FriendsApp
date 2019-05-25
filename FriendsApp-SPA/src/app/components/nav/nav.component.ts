import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};
  userLogged: string;
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  login()
  {
    this.authService.login(this.model)
      .subscribe(next=> {
        this.userLogged = this.model.username;
        console.log(this.model);
        console.log("Login success")
      },
      error =>{
        console.log("Login failed")
      })

    
  }

  loggedIn()
  {
    const token = localStorage.getItem('token');
    return !!token;
  }

  logout()
  {
    localStorage.removeItem('token');
    this.userLogged = "";
    console.log('User has logged out');
  }

}
