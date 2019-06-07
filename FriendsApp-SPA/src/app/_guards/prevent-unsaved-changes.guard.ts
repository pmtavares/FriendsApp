
import { MemberEditComponent } from '../components/members/member-edit/member-edit.component';
import { CanDeactivate } from '@angular/router';
import { Injectable } from '@angular/core';

/*
* Method to prevent user leaves the page when editing
* Because it is a router gurad, we need to add in the route file as well
*/
@Injectable()
export class PreventUnsavedChanges implements CanDeactivate<MemberEditComponent>
{
    canDeactivate(component: MemberEditComponent)
    {
        if(component.editForm.dirty)
        {
            return confirm("Are you sure you want to continue? any changes will be lost!");
        }
        return true;
    }
}