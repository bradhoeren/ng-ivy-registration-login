import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      const currentUser = this.authenticationService.currentUserValue;
      if (currentUser) {
        //already logged in
        return true;
      }

      //not logged in, so redirec to login page with the return URL
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      return false;
  }
}
