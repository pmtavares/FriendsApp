import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Observable, of } from 'rxjs';
import { AlertifyService } from '../services/alertify.service';
import { catchError } from 'rxjs/operators';
import { Message } from '../_models/Message';
import { AuthService } from '../services/auth.service';

/*
* This file is to stop putting "Elvis in the html file"
* Add it in the routing file and App module
*/

@Injectable()
export class MessagesResolver implements Resolve<Message[]>
{
    pageNumber = 1;
    pageSize = 5;
    messageContainer: 'Unread';

    constructor(private userService: UserService, private authService: AuthService,
        private router: Router, private alertify: AlertifyService){}

    resolve(route: ActivatedRouteSnapshot): Observable<Message[]>{
        return this.userService.getMessages(this.authService.decodedToken.nameid,
            this.pageNumber, this.pageSize, this.messageContainer)
            .pipe(catchError(error =>{
                this.alertify.error("Problem retrieving the message");
                this.router.navigate(['/home']);
                return of(null);
            }));
    }
}