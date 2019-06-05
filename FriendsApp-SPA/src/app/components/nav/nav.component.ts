import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};
  userLogged: string;
  constructor(private authService: AuthService, 
    private alertify: AlertifyService, 
    private router: Router) { }

  ngOnInit() {
  }

  login()
  {
    this.authService.login(this.model)
      .subscribe(next=> {
        console.log("Login success")
        this.alertify.success("Login successfuly");
      },
      error =>{
        console.log("Login failed")
        console.log(error);
        this.alertify.error(error);
      }, ()=>{
        this.router.navigate(['/members']);
      })

    
  }

  loggedIn()
  {
    //const token = localStorage.getItem('token');    
    this.userLogged = this.authService.loggedIn();
    if(this.userLogged != "")
    {
        return true;
    }
    return false;
  }

  logout()
  {
    localStorage.removeItem('token');
    this.userLogged = "";
    console.log('User has logged out');
    this.alertify.message("User logged out");
    this.router.navigate(['/home']);
  }



}
