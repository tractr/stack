import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { map } from 'rxjs';

import { AUTHENTICATION_OPTIONS } from '../constants';
import { SessionService } from '../services';
import { AuthenticationModuleOptions } from '../types';

export function isLoggedGuard() {
  return (_: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const router = inject(Router);
    const sessionService = inject(SessionService);
    const options = inject<AuthenticationModuleOptions>(AUTHENTICATION_OPTIONS);

    return sessionService.me$.pipe(
      map((user) => {
        if (user) {
          sessionService.setPathAfterLogin(null);
          return true;
        }

        sessionService.setPathAfterLogin(state);

        return router.createUrlTree([options.redirect.login]);
      }),
    );
  };
}
