import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { catchError, EMPTY, Observable } from 'rxjs';
import { Survey } from '../models/survey';
import { SurveyService } from './survey.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SurveyFetchingResolver implements Resolve<Survey> {

  constructor(
     private surveyService: SurveyService,
     private authService: AuthService,
     private router: Router,

  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Survey> {
    const surveyId = route.params['id'];
    return this.surveyService.getSurveyQuestions(surveyId).pipe(
        catchError(_error => {
          const role = this.authService.getRole();
          let path = 'admin/survey';
          if (role == undefined) {
            path = 'account/login';
          } else if ( role == 'User') {
            path = 'user/home'
          }
          this.router.navigate([path]).then(() => {
            console.log('Navigation: success: data failure');
          }).catch(er => {
            console.warn("Unable to navigate: " + er);
          })
          return EMPTY;
        })
    );
  }
}
