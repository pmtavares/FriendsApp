import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MemberListComponent } from './components/members/member-list/member-list.component';
import { MessagesComponent } from './components/messages/messages.component';
import { ListsComponent } from './components/lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailComponent } from './components/members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolver/member-detail.resolver';
import { MemberEditComponent } from './components/members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolver/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { MemberListResolver } from './_resolver/member-list.resolver';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "home", component: HomeComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: "members", component: MemberListComponent, resolve: {users : MemberListResolver}},
      {path: "members/:id", component: MemberDetailComponent, resolve: {user: MemberDetailResolver}},
      {path: "member/edit", component: MemberEditComponent, resolve: {user: MemberEditResolver}, 
                            canDeactivate : [PreventUnsavedChanges]},
      {path: "messages", component: MessagesComponent},
      {path: "lists", component: ListsComponent}
    ]

  },
  {path: "**", redirectTo: 'home', pathMatch: 'full'}

  /*{path: "members", component: MemberListComponent, canActivate: [AuthGuard]},
  {path: "messages", component: MessagesComponent},
  {path: "lists", component: ListsComponent},
  {path: "**", redirectTo: 'home', pathMatch: 'full'} */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
