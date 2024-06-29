import { Component, OnInit } from '@angular/core';
import { UserInfo, UserRegister } from 'src/app/models/user';
import { UserServiceService } from 'src/app/services/user-service.service';
import { NgForm } from '@angular/forms';
import { UserGroup } from 'src/app/models/user-group';
import { UserGroupService } from 'src/app/services/user-group.service';

@Component({
  selector: 'app-admin-manage-user',
  templateUrl: './admin-manage-user.component.html',
  styleUrls: ['./admin-manage-user.component.css'],
})
export class AdminManageUserComponent implements OnInit {
  users: UserInfo[] = [];
  User = '';
  searchUser = '';

  searchGroup! : any[];

  userReg: UserRegister = { Email: '', Password: '', Username: '' };
  userGroup: UserGroup = {id: -1, groupName: ""};
  showRegister = false;
  showGroup = false;
  isOpen = false;
  options = [{ label: '', selected: false, id: 0 }];
  userGroupId = [{ groupName: '', id: 0 }];

  constructor(
    private userService: UserServiceService,
    private groupService: UserGroupService,
    private userGroupService: UserGroupService
  ) {}

  ngOnInit() {
    this.userService.getAllUsersComplete().subscribe((data: UserInfo[]) => {
      this.users = data;
    });
    this.getGroups();
  }

  registerUser(userForm: NgForm) {
    if (userForm.valid) {
      this.userReg = {
        Email: this.userReg.Email,
        Username: this.userReg.Username,
      };

      this.userService.registerUser(this.userReg).subscribe(
        (data) => {
          this.userService.getAllUsers().subscribe((data: UserInfo[]) => {
            this.users = data;
          });
          console.log('Saved');
        },
        (error) => {
          console.log('Error creating user : ' + error.toString());
        }
      );
      userForm.resetForm();
    }
  }

  createGroup(groupForm: NgForm) {
    if(groupForm.valid){
      console.log("valid")
      this.userGroup = {id: -1, groupName: this.userGroup.groupName}

    this.groupService.createUserGroup(this.userGroup).subscribe(
      (data) => {
        console.log('Group Created');
      },
      (error) => {
        console.log('Error creating group: ' + error.toString());
      }
    );
    }

    groupForm.resetForm();
  }

  openForm(choice: boolean) {
    if (choice) {
      this.showRegister = true;
    }
    else {
      this.showGroup = true;
    }
  }

  closeForm(choice: boolean) {
    if (choice) {
      this.showRegister = false;
    }
    else{
      this.showGroup = false;
    }
  }

  userFilter(){
    this.searchUser = this.User;
    const selectedOptions = this.options.filter(option => option.selected === true);
    this.searchGroup = selectedOptions
  }

  onCityFilterClear(){
    this.searchUser = '';
    this.User = '';
  }

  getGroups() {
    this.userGroupService.getUserGroups().subscribe((data: UserGroup[]) => {
      for (let i = 0; i < data.length; i++) {
        const groupName = data[i].groupName || '';

        this.options.push({
          label: groupName,
          selected: false,
          id: data[i].id,
        });
      }
    });

    this.options.shift();
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  onCheckboxChange(option: any) {
    if (!option.selected) {

    } else {

    }
  }

}
