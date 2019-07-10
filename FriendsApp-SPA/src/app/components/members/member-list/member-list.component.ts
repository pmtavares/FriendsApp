import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/User';
import { UserService } from 'src/app/services/user.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { PaginationResult, Pagination } from 'src/app/_models/Pagination';
import { PageChangedEvent } from 'ngx-bootstrap';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  users: User[];
  pagination: Pagination;
  //Filters
  user: User = JSON.parse(localStorage.getItem('user'));
  genderList = [{value: 'male', display:'Males'}, {value: 'female', display: 'Females'}];
  userParams: any = {};

  constructor(private userService: UserService, private alertify: AlertifyService, 
    private route: ActivatedRoute) { }

  ngOnInit() {    
    this.loadUsersResolve();
    this.loadUserParams();
    this.loadUsers();
    }

  loadUserParams()
  {
    this.userParams.gender = this.user.gender === 'female'?'male':'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.userParams.orderBy = 'lastActive';
  }

  resetFilters()
  {
    this.loadUserParams();
    this.loadUsersResolve();
  }

  
  loadUsersResolve()
  {
    this.route.data.subscribe(data=>{
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    });
  }

  
  loadUsers()
  {
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams)
    .subscribe((users: PaginationResult<User[]>)=>{
      this.users = users.result;
      this.pagination = users.pagination;
    },
    error => {
      this.alertify.error(error);
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

}
