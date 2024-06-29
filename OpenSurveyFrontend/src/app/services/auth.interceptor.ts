import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    }
    console.log("JWT-HTTP-Interceptor : ");
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !req.url.endsWith('/refresh')) {
          return this.authService.refreshToken().pipe(
            switchMap((token: any) => {
              this.authService.saveToken(token.value);
              console.log("Refreshed token : " + token.token!);
              req = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${this.authService.getToken()}`
                }
              })
              return next.handle(req);
            }),
            catchError((refreshError) => {
              return throwError(() => refreshError);
            })
          );
        }
        return throwError(() => error);
      })
    );
  }

}
