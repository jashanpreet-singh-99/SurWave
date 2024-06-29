import { Component, OnInit } from '@angular/core';
import { ColorConfig } from '../color-config';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';

const enum Role {
  Admin = "Admin",
  User = "User"
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: ToastEvokeService,
  ) {
    const role = this.authService.getRole();
    this.isAdmin = role != undefined && role === Role.Admin;
  }

  isAdmin: boolean;

  isSurvey: boolean = false;

  primaryColor = ColorConfig.primaryColor;
  bgColor = ColorConfig.bgColor;
  primaryColorHLess = ColorConfig.primaryColorHashLess;
  bgColorHLess = ColorConfig.bgColorHashLess;

  isHomeColor = this.bgColorHLess;
  isSurveyColor = this.bgColorHLess;
  isManageUserColor = this.bgColorHLess;

  showHomeTip: boolean = false;
  showSurveyTip: boolean = false;
  showUserTip: boolean = false;

  isLogoutColor = this.bgColorHLess;

  checkHomeColor(hStat: boolean) {
    this.isHomeColor = hStat ? this.primaryColorHLess : this.bgColorHLess;
    this.showHomeTip = hStat;
  }

  checkSurveyColor(hStat: boolean) {
    this.isSurveyColor = hStat ? this.primaryColorHLess : this.bgColorHLess;
    this.showSurveyTip = hStat;
  }

  checkUserColor(hStat: boolean) {
    this.isManageUserColor = hStat ? this.primaryColorHLess : this.bgColorHLess;
    this.showUserTip = hStat;
  }

  ngOnInit(): void {
    this.isSurvey = this.router.url.includes('survey');
    console.log("URL " + this.router.url);
    if (this.isSurvey) {
      this.isSurveyColor = this.primaryColorHLess;
    }
  }

  onHomeClick() {
    if (this.isAdmin) {
      this.router.navigate(['/admin/home']).then(() => {
        console.log('Navigation Success');
      }).catch(error => {
        this.toastService.warning('Navigation Failure', 'Please try again.');
        console.error('Navigation failed:', error);
      });
    } else {
      this.router.navigate(['/user/home']).then(() => {
        console.log('Navigation Success');
      }).catch(error => {
        this.toastService.warning('Navigation Failure', 'Please try again.');
        console.error('Navigation failed:', error);
      });
    }
  }

  onSurveyClick() {
    this.router.navigate(['/admin/survey']).then(() => {
      console.log('Navigation Success');
    }).catch(error => {
      this.toastService.warning('Navigation Failure', 'Please try again.');
      console.error('Navigation failed:', error);
    });
  }

  onManageUserClick() {
    this.router.navigate(['/admin/manage']).then(() => {
      console.log('Navigation Success');
    }).catch(error => {
      this.toastService.warning('Navigation Failure', 'Please try again.');
      console.error('Navigation failed:', error);
    });
  }

  logoutUser() {
    this.authService.saveTokens('', '');
    this.toastService.success("User Logged-Out", "Redirecting to the login page.")
    this.router.navigate(['/account/login']).then(() => {
      console.log('Navigation Success');
    }).catch(error => {
      this.toastService.warning('Navigation Failure', 'Please try again.');
      console.error('Navigation failed:', error);
    });
  }

}
