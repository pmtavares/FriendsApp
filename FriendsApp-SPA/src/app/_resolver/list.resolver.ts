import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Observable, of } from 'rxjs';
import { User } from '../_models/User';
import { AlertifyService } from '../services/alertify.service';
import { catchError } from 'rxjs/operators';
import { PaginationResult } from '../_models/Pagination';

/*
* This file is to stop putting "Elvis in the html file"
* Add it in the routing file and App module
*/

@Injectable()
export class ListResolver implements Resolve<User[]>
{
    pageNumber = 1;
    pageSize = 5;
    likesParam = 'Likers';

    constructor(private userService: UserService, 
        private router: Router, private alertify: AlertifyService){}

    resolve(route: ActivatedRouteSnapshot): Observable<User[]>{
        return this.userService.getUsers(this.pageNumber, this.pageSize, null, this.likesParam)
            .pipe(catchError(error =>{
                this.alertify.error("Problem retrieving the data");
                this.router.navigate(['/home']);
                return of(null);
            }));
    }
}