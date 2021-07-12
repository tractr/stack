import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import {
  AUTH_OPTIONS,
  AuthenticationOptionsInterface,
} from '../authentication.config';

@Injectable()
export class PasswordService {
  private resetUrl!: string;

  /** Constructor */
  constructor(
    @Inject(AUTH_OPTIONS)
    private options: AuthenticationOptionsInterface,
    private http: HttpClient,
  ) {
    this.resetUrl = `${this.options.api.url}/${this.options.password.reset.url}`;
  }

  /** Send request to API for a new password token */
  async request(email: string): Promise<void> {
    await this.http.post(this.resetUrl, { email }).toPromise();
  }

  /** Do the password reset */
  async reset(
    userId: string,
    resetCode: string,
    newPassword: string,
  ): Promise<void> {
    const body = {
      _id: userId,
      code: resetCode,
      password: newPassword,
    };
    await this.http.put(this.resetUrl, body).toPromise();
  }
}