import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../_models/User';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { PaginationResult } from '../_models/Pagination';
import { map } from 'rxjs/operators';
import { Message } from '../_models/Message';



//Include this header in the requests
/*const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  })

}
*/

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  //Method with pagination
  getUsers(page?, itemsPerPage?, userParams?, likeParams?): Observable<PaginationResult<User[]>>{
    const paginationResult : PaginationResult<User[]> = new PaginationResult<User[]>();
    let params = new HttpParams();

    if(page != null && itemsPerPage != null)
    {
      params = params.append("pageNumber", page);
      params = params.append("pageSize", itemsPerPage)
    }

    if(userParams != null)
    {
        params = params.append("minAge", userParams.minAge);
        params = params.append("maxAge", userParams.maxAge);
        params = params.append("gender", userParams.gender);
        params = params.append("orderBy", userParams.orderBy);
    }
    //Users that liked and likees
    if(likeParams === 'Likers')
    {
        params = params.append('likers', 'true');
    }

    if(likeParams === 'Likees')
    {
        params = params.append('likees', 'true');
    }


    return this.http.get<User[]>(this.baseUrl+"users", {observe: 'response', params})
      .pipe(
        map(response => {
          paginationResult.result = response.body;
          if(response.headers.get('Pagination') != null)
          {
            paginationResult.pagination = JSON.parse(response.headers.get('Pagination'))
          }
          return paginationResult;
        })
      );
  }

  /*getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.baseUrl+"users"); //httpOptions
  }*/

  getUser(id):Observable<User>{
    return this.http.get<User>(this.baseUrl+"users/"+id); //httpOptions
  }

  updateUser(id: number, user: User)
  {
    return this.http.put(this.baseUrl + 'users/'+ id, user);
  }

  setMainPhoto(userId: number, id: number)
  {
    return this.http.post(this.baseUrl + 'users/'+ userId + "/photos/"+ id+ "/setMain", {});
  }

  deletePhoto(userId: number, id: number)
  {
    return this.http.delete(this.baseUrl+ 'users/'+ userId+ "/photos/" + id);
  }

  sendLike(id: number, recipientId: number)
  {
    return this.http.post(this.baseUrl+ 'users/'+ id + '/like/'+ recipientId, {});  
  }

  getMessages(id: number, page?, itemsPerPage?, messageContainer? )
  {
    const paginatedResult: PaginationResult<Message[]> = new PaginationResult<Message[]>();
    let params = new HttpParams();
    params = params.append('MessageContainer', messageContainer);

    if(page != null && itemsPerPage != null)
    {
      params = params.append("pageNumber", page);
      params = params.append("pageSize", itemsPerPage)
    }
    return this.http.get<Message[]>(this.baseUrl + 'users/'+id + '/messages', {observe: 'response', params})
    .pipe(
      map(response =>{
        paginatedResult.result = response.body;
        if(response.headers.get('Pagination') !== null)
        {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    );


  }

  getMessageThread(id: number, recipientId: number)
  {
      return this.http.get<Message[]>(this.baseUrl + 'users/'+ id + '/messages/thread/' +  recipientId);
  }

  sendMessage(id: number, message:  Message)
  {
    return this.http.post(this.baseUrl + 'users/' + id + '/messages', message);
  }

  deleteMessage(id: number, userId: number)
  {
    return this.http.post(this.baseUrl + 'users/' + userId + '/messages/' + id, {});
  }
  
  markAsRead(userId: number, messageId: number)
  {
    this.http.post(this.baseUrl + 'users/' + userId + '/messages/' + messageId + '/read', {})
      .subscribe();
  }

  
}
