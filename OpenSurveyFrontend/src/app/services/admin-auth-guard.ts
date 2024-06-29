import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private router: Router,
              private authService: AuthService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const role = this.authService.getRole();
    const isAuthorized = role === "Admin";
    if (!isAuthorized) {
      this.router.navigate(['error']).then(
        () => {
          console.log("Navigation success");
        }
      ).catch(error => {
        console.error("Navigation Error: " + error);
      });
    }
    return isAuthorized;
  }

}
