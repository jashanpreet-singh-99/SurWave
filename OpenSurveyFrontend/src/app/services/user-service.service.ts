import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserInfo, UserInfoCom, UserRegister } from '../models/user';
import { KeyValueS } from '../models/key-value-s';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<UserInfo[]> {
    return this.http.get<UserInfo[]>('https://localhost:7164/api/Account/list');
  }

  getAllUsersComplete(): Observable<UserInfo[]> {
    return this.http.get<UserInfo[]>('https://localhost:7164/api/Account/list/complete');
  }

  getAllUsersComplete1(): Observable<UserInfoCom[]> {
    return this.http.get<UserInfoCom[]>('https://localhost:7164/api/Account/list/complete');
  }

  registerUser(user: UserRegister) {
    console.log("post")
    console.log(user)
    return this.http.post('https://localhost:7164/api/Account/register', user)
  }

  userActivate(status: boolean, user : UserInfo){
    if(status){
      console.log("User deactivated: " + user.email)
      return this.http.patch('https://localhost:7164/api/Account/deactivate', user)
    }
    else{
      console.log("User activated: " + user.email)
      return this.http.patch('https://localhost:7164/api/Account/activate', user)
    }
  }

  getActiveUsers() {
    return this.http.get<KeyValueS>(' https://localhost:7164/api/account/count')
  }

}
