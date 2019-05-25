import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode: boolean = false;
  values: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    //this.getValues(); Example of passing value from Parent to child between components
  }

  registerToggle(){
    this.registerMode = true;
  }

  getValues(){
    this.http.get("http://localhost:5000/api/values/")
      .subscribe(response => {
        this.values = response;
        console.log(response);
      },
      error => {
        console.log(error);
      });
  }

  cancelRegisterMode(registerMode: boolean)
  {
    this.registerMode = registerMode;
  }

}
