import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { BsDropdownModule, TabsModule } from 'ngx-bootstrap';
import {JwtModule} from '@auth0/angular-jwt';
import { NgxGalleryModule } from 'ngx-gallery';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { AuthService } from './services/auth.service';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { ErrorInterceptorProvider } from './services/error.intercept';
import { AlertifyService } from './services/alertify.service';
import { JqueryBootStrapService } from './services/jquerybootstrap.service';
import { MemberListComponent } from './components/members/member-list/member-list.component';
import { ListsComponent } from './components/lists/lists.component';
import { MessagesComponent } from './components/messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';
import { UserService } from './services/user.service';
import { MemberCardComponent } from './components/members/member-card/member-card.component';
import { MemberDetailComponent } from './components/members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolver/member-detail.resolver';



export function tokenGetter()
{
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    ListsComponent,
    MessagesComponent,
    MemberCardComponent,
    MemberDetailComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    NgxGalleryModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:5000'],
        blacklistedRoutes: ['localhost:5000/api/auth']
      }
    })
  ],
  providers: [
    AuthService,
    ErrorInterceptorProvider,
    AlertifyService,
    AuthGuard,
    JqueryBootStrapService,
    UserService,
    MemberDetailResolver
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
