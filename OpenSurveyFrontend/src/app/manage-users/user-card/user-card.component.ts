import { Component, Input } from '@angular/core';
import { UserInfoCom } from 'src/app/models/user';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {
  @Input() user : UserInfoCom = {} as UserInfoCom;

  constructor(
    private userService: UserServiceService,
  ) {}

  userActive(){
    this.userService.userActivate(this.user.user.isActive, this.user.user).subscribe(
      (data) => {
        console.log('User deactivated/activated');
      },
      (error) => {
        console.log('Error: deactivating/activating : ' + error.toString());
      }
    );

    this.user.user.isActive = !this.user.user.isActive
  }
}