import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpBackend, HttpRequest, HttpResponse } from '@angular/common/http';
import { User } from '@asi-ecommerce/api-interfaces';
import { filter, map } from 'rxjs/operators';

const REFRESH_TOKEN_KEY = 'refreshToken';
const ACCESS_TOKEN_KEY = 'accessToken';

interface Tokens {
  refreshToken: string;
  accessToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpBackend: HttpBackend) {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  getAccessToken(): string {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  renewAccessTokens$(): Observable<void> {
    return this.post<Tokens>('/api/auth/renewTokens', { refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY) }).pipe(
      map(tokens => {
        localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
        localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
      }),
    );
  }

  login$(login: string, password: string): Observable<User> {
    return this.post<Tokens & { user: User }>('/api/auth/login', { email: login, password }).pipe(
      map(res => {
        localStorage.setItem(ACCESS_TOKEN_KEY, res.accessToken);
        localStorage.setItem(REFRESH_TOKEN_KEY, res.refreshToken);
        return res.user;
      }),
    );
  }

  private post<T>(url: string, body: unknown) {
    return this.httpBackend.handle(new HttpRequest<unknown>('POST', url, body)).pipe(
      filter(event => event instanceof HttpResponse),
      map((res: HttpResponse<T>) => res.body),
    );
  }

  cleanTokens() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }
}
