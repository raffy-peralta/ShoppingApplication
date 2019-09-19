import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _router: Router) { }

  /**
   * this is used to clear anything that needs to be removed
   */
  clear(): void {
    localStorage.removeItem('details');
    localStorage.removeItem('token');
  }

  /**
   * check for expiration and if token is still existing or not
   * @return {boolean}
   */
  isAuthenticated(): boolean {
    return localStorage.getItem('token') != null && !this.isTokenExpired();
  }

  // simulate jwt token is valid
  // https://github.com/theo4u/angular4-auth/blob/master/src/app/helpers/jwt-helper.ts
  isTokenExpired(): boolean {
    return false;
  }


  login(json): void {
    localStorage.setItem('details', JSON.stringify(json));
    localStorage.setItem('token', `1`);

    this._router.navigate(['/dashboard/home']);
  }

  /**
   * this is used to clear local storage and also the route to login
   */
  logout(): void {
    this.clear();
    localStorage.removeItem('state');
    // this._router.navigate(['/login']);
  }

  decode() {
    return localStorage.getItem('token');
  }
}