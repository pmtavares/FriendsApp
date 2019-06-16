import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterValidators } from './register.validation';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() valueFromHome: any; //remove this line
  @Output() cancelRegister =  new EventEmitter();
  registerForm: FormGroup; //Reactive forms

  model: any = {}
  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm()
  {
    return this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]),
      confirmPassword: new FormControl('', Validators.required)
    }, {validators: RegisterValidators.MatchPassword});
  }

  get username()
  {
    return this.registerForm.get('username');
  }

  get password()
  {
    return this.registerForm.get('password');
  }

  get confirmPassword()
  {
    return this.registerForm.get('confirmPassword');
  }

  //Register User
  register()
  {
    /* comment this code in order to implement Reactive forms
    this.authService.register(this.model).subscribe(()=>{
      console.log("Success registered");
      this.alertify.success("Success Registered");
    },
    error=>{
      console.log(error);
      this.alertify.error(error);
    }
    ) */
    console.log(this.registerForm.value);
  }
 //Not working
  passwordMatchValidator(g: FormGroup){
    return g.get("password").value === g.get("confirmPassword").value ? null : {'mismatch': true};
  }

  //Cancel Registration
  cancel()
  {
    this.cancelRegister.emit(false);
    console.log("cancelled");
    this.alertify.warning("Registration Canceled");
    
  }

}
