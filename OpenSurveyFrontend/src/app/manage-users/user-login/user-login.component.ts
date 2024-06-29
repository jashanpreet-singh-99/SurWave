import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserForLogin } from '../../models/user';
import { KeyValueS } from '../../models/key-value-s';
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { ColorConfig } from 'src/app/color-config';
import { UsernameService } from '../../services/username.service';


const enum Role {
  Admin = "Admin",
  User = "User"
}

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  primaryColor = ColorConfig.primaryColor;
  primaryColorHashLess = ColorConfig.primaryColorHashLess;
  public UserName!: string

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastEvoke: ToastEvokeService,
    private usernameService: UsernameService
  ) { }

  ngOnInit(): void {
  }

  onLogin(loginForm: NgForm) {
    console.log(loginForm);
    this.authService.authenticateUser(loginForm.value).subscribe(
      response => {
        const user = response as UserForLogin;
        this.authService.saveTokens(user.token!, user.refreshToken!);
        console.log('TOKEN:' + user.token);
        let role = this.authService.getRole();
        console.log('ROLE:' + role);
        // localStorage.setItem("token", user.token!);
        this.usernameService.setUsername(user.userName!)
        localStorage.setItem('username', user.userName!);
        if (role === Role.Admin) {
          this.router.navigate(['/admin/home']).then(() => {
            console.log("Navigation success");
            this.toastEvoke.success('success', 'welcome Administrator!')
          }).catch(error => {
            console.log("Navigation failure: " + error);
            this.toastEvoke.warning("Navigation Failure", 'Please try again.');
          });
        } else if (role === Role.User) {
          this.router.navigate(['user/home']).then(() => {
            console.log("Navigation success");
            this.toastEvoke.success('success', 'Welcome, have a SurWavy day!')
          }).catch(error => {
            console.log("Navigation failure: " + error);
            this.toastEvoke.warning("Navigation Failure", 'Please try again.');
          });
        }
      },
      error => {
        // Handle authentication error here
        console.error("Authentication failed: " + error);
        this.toastEvoke.danger('Error', 'Invalid username or password');
      }
    );
  }

  onForgetPassword(loginForm: NgForm) {
    let email: KeyValueS = new KeyValueS();
    email.value = loginForm.controls['email'].value;
    console.log(email);
    this.authService.forgetPassword(email).subscribe(
      response => {
        this.toastEvoke.success('New password sent', 'A new password has be generated and sent to your email.')
        console.log(response);
      },
      error => {
        this.toastEvoke.danger('Error', 'Please enter a valid email')
      }
    );
  }

}
