import { Injectable } from '@angular/core';

declare let $: any;

@Injectable({
  providedIn: 'root'
})
export class JqueryBootStrapService {

  constructor() { }

  toast()
  {
    console.log("service called");
      $('.toast').toast('show');
  }

  alert()
  {
    $('.alert').alert();
 
  }
}
