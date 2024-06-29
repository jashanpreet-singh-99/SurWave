import { Component, Input } from '@angular/core';
import { UserGroupService } from 'src/app/services/user-group.service';
import { UserGroup } from 'src/app/models/user-group';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
})
export class DropdownComponent {
  isOpen = false;
  options = [{ label: '', selected: false, id: 0 }];
  groups: UserGroup[] = [];
  userGroupId = [{ groupName: '', id: 0 }];

  @Input() userEmail?: string;

  constructor(
    private userGroupService: UserGroupService,
    private userService: UserServiceService
  ) {}

  ngOnInit() {
    this.getGroups()
  }

  getGroups(){
    let emailToFind = this.userEmail;

    this.userService.getAllUsersComplete1().subscribe((data) => {
      let user = data.find((user) => user.user.email === emailToFind);

      this.userGroupService.getUserGroups().subscribe((data: UserGroup[]) => {
        for (let i = 0; i < data.length; i++) {
          const groupName = data[i].groupName || '';

          if (user) {
            let isSelected =
              Array.isArray(user.userGroups) &&
              user.userGroups.includes(data[i].id);

            this.options.push({
              label: groupName,
              selected: isSelected,
              id: data[i].id,
            });
          } else {
            this.options.push({
              label: groupName,
              selected: false,
              id: data[i].id,
            });
          }
        }
      });

      this.options.shift();
    });
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  groupAdd() {
    const selectedOptions = this.options
      .filter((option) => option.selected)
      .map((option) => {
        return {
          ...option,
          userEmail: this.userEmail,
        };
      });

    var sendDto = {
      userEmail: this.userEmail,
      id: selectedOptions[selectedOptions.length - 1].id,
    };

    this.userGroupService.addUserGroup(sendDto).subscribe((data) => {
      console.log(data);
    });
  }

  groupUserDelete(option: any) {
    var sendDto = {
      userEmail: this.userEmail,
      id: option.id,
    };
    console.log(sendDto)
    this.userGroupService.deleteUserFromGroup(sendDto).subscribe((data) => {
      console.log(data);
    });
  }

  onCheckboxChange(option: any) {
    if (!option.selected) {
      this.groupUserDelete(option)
    } else {
      this.groupAdd()
    }
  }
}
