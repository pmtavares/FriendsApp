import { Injectable } from '@angular/core';

//Just declare alertify in order to not see any error
declare let alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  confirm(title: string, message: string, okCallback: ()=>any)
  {
    alertify.confirm(title, message, function(e){
      if(e)
      {
        okCallback();
      }
      
    },function(){alertify.warning('Delete canceled')}); 

  }

  success(message: string){
    alertify.success(message);
  }
  error(message: string){
    alertify.error(message);
  }
  warning(message: string){
    alertify.warning(message);
  }
  message(message: string){
    alertify.warning(message);
  }
}
