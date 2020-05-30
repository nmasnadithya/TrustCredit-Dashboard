import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {NbAuthJWTToken, NbAuthService} from '@nebular/auth';
import {map} from 'rxjs-compat/operator/map';
import {tap} from 'rxjs/operators';

@Injectable()
export class AuthGuardService implements CanActivate {


  constructor(private authService: NbAuthService, private router: Router) {
  }

  canActivate() {
    return this.authService.isAuthenticated()
      .pipe(
        tap(authenticated => {
          if (!authenticated) {
            this.router.navigate(['auth/login']);
          }
        }),
      );
  }
}
