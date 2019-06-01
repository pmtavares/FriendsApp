import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() valueFromHome: any;
  @Output() cancelRegister =  new EventEmitter();

  model: any = {}
  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  //Register User
  register()
  {
    this.authService.register(this.model).subscribe(()=>{
      console.log("Success registered");
      this.alertify.success("Success Registered");
    },
    error=>{
      console.log(error);
      this.alertify.error(error);
    }
    )
  }

  //Cancel Registration
  cancel()
  {
    this.cancelRegister.emit(false);
    console.log("cancelled");
    this.alertify.warning("Registration Canceled");
    
  }

}
