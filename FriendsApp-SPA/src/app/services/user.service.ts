import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../_models/User';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { PaginationResult } from '../_models/Pagination';
import { map } from 'rxjs/operators';


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
  getUsers(page?, itemsPerPage?, userParams?): Observable<PaginationResult<User[]>>{
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

  
}
