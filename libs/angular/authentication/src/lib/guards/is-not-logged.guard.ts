import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';

import { AUTHENTICATION_OPTIONS } from '../constants';
import { SessionService } from '../services';
import { AuthenticationModuleOptions } from '../types';

export function isNotLoggedGuard() {
  return () => {
    const router = inject(Router);
    const sessionService = inject(SessionService);
    const options = inject<AuthenticationModuleOptions>(AUTHENTICATION_OPTIONS);

    return sessionService.me$.pipe(
      map((user) => {
        if (user) {
          return router.createUrlTree([options.redirect.notLogged]);
        }

        return true;
      }),
    );
  };
}
