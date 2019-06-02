import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MemberListComponent } from './components/member-list/member-list.component';
import { MessagesComponent } from './components/messages/messages.component';
import { ListsComponent } from './components/lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "home", component: HomeComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: "members", component: MemberListComponent},
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
