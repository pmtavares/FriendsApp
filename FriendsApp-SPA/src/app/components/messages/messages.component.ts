import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/_models/Message';
import { Pagination, PaginationResult } from 'src/app/_models/Pagination';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messages: Message[];
  pagination: Pagination;
  messageContainer = 'Unread';

  constructor(private userService: UserService, private authService: AuthService, private route: ActivatedRoute,
              private alertify: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.messages = data['messages'].result;
      this.pagination = data['messages'].pagination;
    });
  }

  loadMessages()
  {
    this.userService.getMessages(this.authService.decodedToken.nameid, this.pagination.currentPage,
      this.pagination.itemsPerPage, this.messageContainer)
      .subscribe((res: PaginationResult<Message[]>)=> {
        this.messages = res.result;
        this.pagination = res.pagination;
        console.log(this.messages);

      }, error =>{
        this.alertify.error(error);
      })
  }

  pageChanged(event: any): void
  {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }

  deleteMessage(id: number, event)
  {
    this.alertify.confirm("Delete Message? ","Are you sure you want to delete this message?", () => {
      this.userService.deleteMessage(id, this.authService.decodedToken.nameid)
            .subscribe(()=> {
              this.messages.splice(this.messages.findIndex(m=> m.id === id), 1);
              this.alertify.success("Message deleted");
            }, error =>{
              console.log(error);
              this.alertify.error("Failed to delete the message");
            });
    });
    event.stopPropagation(); // Avoid [routerLink]="['/members'] being executed
  }

    
    
  

}
