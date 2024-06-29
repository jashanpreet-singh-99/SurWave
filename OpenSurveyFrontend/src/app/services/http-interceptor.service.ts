import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError, } from 'rxjs';
import { catchError, concatMap, retryWhen } from 'rxjs/operators';
import { ErrorCode } from '../enums/enums';
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';

@Injectable({
    providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

    constructor(private toastEvoke: ToastEvokeService) {}
    intercept(request: HttpRequest<any>, next: HttpHandler) {
        console.log('HTTP Request started');
        return next.handle(request)
            .pipe(
                retryWhen(error => this.retryRequest(error, 5)),
                catchError((error: HttpErrorResponse) => {
                    console.log("HTTP-Error:" + error);
                    if (error.status === 401) {
                      return  throwError(() => error);
                    }
                    const errorMessage = this.setError(error);
                    this.toastEvoke.danger('Error', errorMessage);
                    return throwError(() => errorMessage);
                })
            );
    }

    // Retry the request in case of errror
    retryRequest(
      error: Observable<any>,
      retryCount: number
    ): Observable<unknown> {
        return error.pipe(
            concatMap((checkErr: HttpErrorResponse, count: number) => {
                if(count <= retryCount)
                {
                  console.log('Error-Status: ' + checkErr.status);
                  switch(checkErr.status) {
                    case ErrorCode.serverDown :
                        return of(checkErr);
                    // case ErrorCode.unauthorized :
                    //      return of(checkErr);
                    }
                }
                return throwError(() => checkErr);
            })
        );
    }

    setError(error: HttpErrorResponse): string {
        let errorMessage = 'Unknown error occurred';
        if(error.error instanceof ErrorEvent) {
            // Client side error
            errorMessage = error.error.message;
        } else {
            // server side error
            if (error.status!==0) {
                errorMessage = error.error.errorMessage;
            }
        }
        return errorMessage;
    }
}
