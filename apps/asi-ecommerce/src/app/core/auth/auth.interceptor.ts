import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, exhaustMap, first, share, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  // allow to queue multiple refreshToken query in parallel and only make 1 HTTP call
  private _requestToken$ = new Subject();
  private _nextToken$ = this._requestToken$.pipe(
    exhaustMap(() => this.authService.renewAccessTokens$()),
    share(),
  );

  constructor(private authService: AuthService, private router: Router) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next
      .handle(this._addToken(req)) //
      .pipe(catchError(err => this.handleError(err, next, req)));
  }

  handleError(err: HttpErrorResponse, next: HttpHandler, req: HttpRequest<unknown>): Observable<HttpEvent<unknown>> {
    if (err.status === 401) {
      // the setTimeout is required to ensure that the nextToken is subscribed before to send request
      setTimeout(() => this._requestToken$.next());
      return this._nextToken$.pipe(
        first(), // Interceptors keep the subscription until completion, would multiply parallel calls each time the token is refreshed
        switchMap(() => next.handle(this._addToken(req))), // retry
        catchError(secondErr => {
          console.log(secondErr);
          if (secondErr.status === 401) {
            this.authService.cleanTokens();
            this.router.navigate(['/login']);
          }
          return throwError(secondErr);
        }),
      );
    } else {
      return throwError(err);
    }
  }

  private _addToken(req: HttpRequest<unknown>): HttpRequest<unknown> {
    const token = this.authService.getAccessToken();
    return token ? req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) }) : req;
  }
}
