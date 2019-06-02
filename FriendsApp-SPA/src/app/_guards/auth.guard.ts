import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertifyService } from '../services/alertify.service';

@Injectable({
  providedIn: 'root'
})
/*
* In order to generate this service: ng g guard auth --spec=false {skipTests}
*/
export class AuthGuard implements CanActivate  {

  constructor(private authService: AuthService, private router: Router, private alertify: AlertifyService) {
    
  }

  canActivate(): boolean {
    if(this.authService.loggedIn())
    {
      return true;
    }
    this.alertify.error("You can't navigate there...");
    this.router.navigate(['/home']);
    return false;
    
  }
 
}
