import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/User';
import { UserService } from '../services/user.service';
import { AlertifyService } from '../services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
/*
* This file is to stop putting "Elvis in the html file"
* Add it in the routing file and App module
*/

@Injectable()
export class MemberDetailResolver implements Resolve<User>
{
    constructor(private userService: UserService, 
        private router: Router, private alertify: AlertifyService){}

    resolve(route: ActivatedRouteSnapshot): Observable<User>{
        return this.userService.getUser(route.params['id'])
            .pipe(catchError(error =>{
                this.alertify.error("Could not retrieve the data");
                this.router.navigate(['/members']);
                return of(null);
            }))
    }
}