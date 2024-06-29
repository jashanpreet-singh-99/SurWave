import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { ColorConfig } from '../color-config';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {


  // Lottie animations
  lottieOptions: AnimationOptions = {
    path: '/assets/error.json',
  };

  primaryColor = ColorConfig.primaryColor;
  bgColor = ColorConfig.bgColor;
  errorRedColor = ColorConfig.errorRed;

  isBackButtonHovered = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['account/login']).then(() => {
        console.log('Not logged In');
      }).catch(error => {
        console.log("Navigation Error" + error);
      });
    }
  }

  backToDashboard () {
    let path = '/user/home'
    const role = this.authService.getRole();
    if (role == undefined) {
      this.router.navigate(['/account/login']).then(() => {
        console.log("Navigation Success: login");
      }).catch(error => {
        console.log("Navigation Error: " + error)
      });
      return;
    }
    if (role === "Admin") {
      path = '/admin/home'
    }
    this.router.navigate([path]).then(() => {
      console.log("Navigation Success");
    }).catch(error => {
      console.log("Navigation Error: " + error)
    });
  }

}
