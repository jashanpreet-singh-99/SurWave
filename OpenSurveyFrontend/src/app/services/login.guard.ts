import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
      private authService: AuthService,
      private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log("Logged In : " + this.authService.isLoggedIn());
    if (!this.authService.isLoggedIn()) {
      return true;
    }
    let path = 'user/home'
    const role = this.authService.getRole();
    if (role === "Admin") {
      path = 'admin/home'
    }
    this.router.navigate([path]).then(() => {
      console.log('Redirecting to home.');
    }).catch(error => {
      console.error('Redirection to Home failed : ' + error);
    });
    return false;
  }



}
