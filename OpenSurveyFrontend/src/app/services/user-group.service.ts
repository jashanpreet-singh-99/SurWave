import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserGroup } from '../models/user-group';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserGroupService {

  constructor(private http: HttpClient) { }

  getUserGroups(): Observable<UserGroup[]>{
    return this.http.get<UserGroup[]>('https://localhost:7164/api/UserGroup/list')
  }

  createUserGroup(group: UserGroup) {
    return this.http.post('https://localhost:7164/api/UserGroup/create', {"value":group.groupName})
  }

  addUserGroup(options: any){
    return this.http.post('https://localhost:7164/api/UserGroup/add/user', options);
  }
  
  deleteUserFromGroup(options: any){
    const params = new HttpParams()
      .set('userEmail', options.userEmail)
      .set('id', options.id);
    return this.http.delete('https://localhost:7164/api/UserGroup/remove/user', { params });
  }
  

}
