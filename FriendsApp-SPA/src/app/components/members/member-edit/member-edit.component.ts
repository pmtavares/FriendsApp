import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from 'src/app/_models/User';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  user: User;
  
  @ViewChild('editForm') editForm: NgForm; //To manipulate the form (reset etc)

  //Method below is to prevent closing the browser when editing the form
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any){
    if(this.editForm.dirty)
    {
      $event.returnValue = true;
    }
  }

  constructor(private route: ActivatedRoute, private alertify: AlertifyService, 
              private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      console.log(data);
      this.user = data['user'];
    })
    
  }

  updateUser()
  {
    this.userService.updateUser(this.authService.decodedToken.nameid, this.user)
      .subscribe(next=> {
        this.alertify.message("Updated Success");
        this.editForm.reset(this.user); //Turn the form to the initial state
      }, error=>{
        this.alertify.error(error);
      });
  }

  updateMainPhoto(photoUrl)
  {
    this.user.photoUrl = photoUrl;
    const user = JSON.stringify(this.user);
    localStorage.setItem('user',user );
  }

 

}
