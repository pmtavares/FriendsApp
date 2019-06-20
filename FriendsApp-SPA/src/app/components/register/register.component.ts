import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { RegisterValidators } from './register.validation';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { User } from 'src/app/_models/User';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() valueFromHome: any; //remove this line
  @Output() cancelRegister =  new EventEmitter();
  registerForm: FormGroup; //Reactive forms
  bsConfig: Partial<BsDatepickerConfig>; //Partial to make option
  maxDate: Date;

  //model: any = {}
  user: User;
  constructor(private authService: AuthService, private alertify: AlertifyService, 
    private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    //this.initializeForm();
    this.createRegistrationForm();
    this.maxDate = new Date();
    this.maxDate.setDate(this.maxDate.getDate());
    this.applyDatepickerConfig();
  }

  private initializeForm()
  {
    return this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]),
      confirmPassword: new FormControl('', Validators.required)
    }, {validators: RegisterValidators.MatchPassword});
  }

  createRegistrationForm(){
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      nickName: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]],
      confirmPassword: ['', Validators.required]
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
    if(this.registerForm.valid)
    {
      this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.user).subscribe(()=>{
        this.alertify.success("Registration Success");
      }, error => {
        this.alertify.error(error);
      },
        //Login the user after registration
        () => {
          this.authService.login(this.user).subscribe(()=> {
            this.router.navigate(["/members"]);
          });
        }
      )
    }
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

  //Apply configurations on Datepicker
  applyDatepickerConfig()
  {
    return this.bsConfig = {
      containerClass: "theme-dark-blue",
      dateInputFormat: 'DD-MM-YYYY'
    }
  }
}
