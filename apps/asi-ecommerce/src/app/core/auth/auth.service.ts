import { Injectable } from '@angular/core';

const REFRESH_TOKEN_KEY = 'refreshToken';
const ACCESS_TOKEN_KEY = 'accessToken';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn(): boolean {
    return !!localStorage.getItem(REFRESH_TOKEN_KEY);
  }
}
