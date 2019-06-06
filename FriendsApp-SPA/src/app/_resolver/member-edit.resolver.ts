import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/User';
import { UserService } from '../services/user.service';
import { AlertifyService } from '../services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
/*
* This file is to stop putting "Elvis in the html file"
* Add it in the routing file and App module
*/

@Injectable()
export class MemberEditResolver implements Resolve<User>
{
    constructor(private userService: UserService, 
        private router: Router, private alertify: AlertifyService, private authService: AuthService){}

    resolve(route: ActivatedRouteSnapshot): Observable<User>{
        console.log("ID is:" +this.authService.decodedToken.nameid);
        return this.userService.getUser(this.authService.decodedToken.nameid)
            .pipe(catchError(error =>{
                console.log(this.authService.decodedToken.nameid);
                this.alertify.error("Could not retrieve your data");
                this.router.navigate(['/members']);
                return of(null);
            }))
    }
}