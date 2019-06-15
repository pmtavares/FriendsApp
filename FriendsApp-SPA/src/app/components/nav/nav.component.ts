import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { Router } from '@angular/router';
import { User } from 'src/app/_models/User';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};
  userLogged: string;
  currentUser: User;
  photoUrl: string;

  constructor(private authService: AuthService, 
    private alertify: AlertifyService, 
    private router: Router) { }

  ngOnInit() {
    //this.authService.currentPhotoUrl.subscribe(photoUrl=> this.photoUrl = photoUrl);
  }

  login()
  {
    this.authService.login(this.model)
      .subscribe(next=> {
        //this.currentUser = this.authService.currentUser;
        this.photoUrl = this.authService.currentUser.photoUrl;
        this.alertify.success("Login successfuly");
      },
      error =>{
        console.log("Login failed")
        this.alertify.error(error);
      }, ()=>{
        this.router.navigate(['/members']);
      })

    
  }

  loggedIn()
  {
    //const token = localStorage.getItem('token');    
    this.userLogged = this.authService.loggedIn();
    //this.currentUser = this.authService.currentUser;
    //this.photoUrl = this.authService.currentUser.photoUrl;
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    
    if(this.userLogged != "")
    {
        return true;
    }
    return false;
  }

  logout()
  {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.userLogged = "";
    this.currentUser = null;
    //this.photoUrl = null;
    console.log('User has logged out');
    this.alertify.message("User logged out");
    this.router.navigate(['/home']);
  }



}
