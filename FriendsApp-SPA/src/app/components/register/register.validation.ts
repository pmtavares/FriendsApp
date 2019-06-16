import { AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';

export class RegisterValidators{
    static cannotContainSpace(control: AbstractControl) : ValidationErrors | null{
        if((control.value as string).indexOf(' ') >= 0)
        {
            return {cannotContainSpace: true}
        }
        return null;
    }
    //Asyn validator operator example
    static shouldBeUnique(control: AbstractControl) : Promise<ValidationErrors | null> 
    {
        return new Promise((resolve, reject) =>{
            setTimeout(() => {
                console.log("ok");
                if(control.value == 'pedro')
                {
                    resolve ({shouldBeUnique : true})
                }
                else{
                    resolve (null);
                }
            }, 2000);
           
        });
    }

    static passwordsMustMatch(g: AbstractControl) : Promise<ValidationErrors |null>
    {

        //return g.get("password").value === g.get("confirmPassword").value ? null : {"mismatch": false};
        return new Promise((resolve, reject) =>{         
                
            if(g.value)
            {
                resolve ({'mismatch' : false});
            }
            else{
                resolve (null);
      
            }
        });
    }

    static MatchPassword(control: AbstractControl) {
        let password = control.get('password').value;
 
        let confirmPassword = control.get('confirmPassword').value;
 
         if(password != confirmPassword) {
             control.get('confirmPassword').setErrors( {'mismatch': true} );
         } else {
             return null
         }
     }
}