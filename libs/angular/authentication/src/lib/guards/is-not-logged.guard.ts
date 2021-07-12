import { Inject, Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

import {
  AUTH_OPTIONS,
  AuthenticationOptionsInterface,
} from '../authentication.config';
import { SessionService } from '../services/session.service';

@Injectable()
export class IsNotLoggedGuard implements CanActivate {
  constructor(
    private sessionService: SessionService,
    private router: Router,
    @Inject(AUTH_OPTIONS)
    private options: AuthenticationOptionsInterface,
  ) {}

  async canActivate(): Promise<UrlTree | boolean> {
    if (await this.sessionService.loggedIn()) {
      return this.router.createUrlTree([
        ...this.options.routing.prefix,
        this.options.login.routing,
      ]);
    }
    return true;
  }
}
