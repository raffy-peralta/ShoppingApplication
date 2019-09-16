import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class AuthGuard implements CanActivate {


  constructor(private authService: AuthService, private _router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.isAuthenticated()) {
        return true;
    }
        // if(this.authService.decode().toString() === `2`){
        //   this._router.navigate(['/dashboard/home']);
        //   console.log('2')
        // }else if(this.authService.decode().toString() === `1`){
        //   this._router.navigate(['/admin/blogs']);
        //   console.log('1')
        // }
        
        // navigate to login page
        this._router.navigate(['/dashboard']);
        // you can save redirect url so after authing we can move them back to the page they requested
        return false;
    

   
  }

}