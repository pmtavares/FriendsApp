import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs'; //To implement access object from others components
import {JwtHelperService} from '@auth0/angular-jwt';


import { User } from '../_models/User';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = "http://localhost:5000/api/auth/";
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: User;
  //Shows photourl in the navbar
  photoUrl = new BehaviorSubject<string>('../../assets/user.png');
  //currentPhotoUrl = this.photoUrl.asObservable();

  constructor(private http: HttpClient) { }

  changeMemberPhoto(photoUrl: string)
  {
    this.photoUrl.next(photoUrl);
  }

  login(model: any)
  {
    return this.http.post(this.baseUrl + 'login', model)
      .pipe(
        map((response: any) =>{
          const user = response;
          console.log(response);
          if(user)
          {
            localStorage.setItem("token", user.token);
            localStorage.setItem("user", JSON.stringify(user.user));

            this.decodedToken = this.jwtHelper.decodeToken(user.token);
            this.currentUser = user.user;
            //this.changeMemberPhoto(this.currentUser.photoUrl);
          }
        })
      );
  }

  register(user: User)
  {
    return this.http.post(this.baseUrl+ 'register', user);
  }

  loggedIn()
  {
    const token = localStorage.getItem('token');
    if(!this.jwtHelper.isTokenExpired(token))
    {
      this.decodedToken = this.jwtHelper.decodeToken(token);
      return this.decodedToken.unique_name;
    }
    else{
      return "";
    }
  }



}
