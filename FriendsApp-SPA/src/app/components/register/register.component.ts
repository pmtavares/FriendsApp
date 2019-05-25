import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() valueFromHome: any;
  @Output() cancelRegister =  new EventEmitter();

  model: any = {}
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  //Register User
  register()
  {
    this.authService.register(this.model).subscribe(()=>{
      console.log("Success registered");
    },
    error=>{
      console.log(error);
    }
    )
  }

  //Cancel Registration
  cancel()
  {
    this.cancelRegister.emit(false);
    console.log("cancelled");
  }

}
