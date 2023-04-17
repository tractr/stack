/* eslint-disable no-restricted-syntax */
import { Injectable } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { Unsubscribe } from '../utils';

@Injectable({
  providedIn: 'root',
})
export class NotificationService extends Unsubscribe {
  messages$ = new Subject<{
    level?: 'success' | 'info' | 'warning';
    message: string;
  }>();

  errors$ = new Subject<{ error: string | Error; stack?: string | null }>();

  constructor() {
    super();
    this.onInit();
  }

  /**
   * Send a message to the message stream.
   * @param message
   * @param level - The level of the message. Defaults to `info`.
   */
  message(message: string, level: 'success' | 'info' | 'warning' = 'info') {
    this.messages$.next({ level, message });
  }

  /**
   * @deprecated Use `error` instead.
   */
  handle(err: string | Error) {
    this.error(err);
  }

  /**
   * Send an error to the error stream.
   * @param err
   */
  error(err: string | Error) {
    if (typeof err === 'string') {
      this.errors$.next({ error: err });
    } else {
      this.errors$.next({ error: err.message, stack: err.stack });
    }
  }

  /**
   * Send an info message to the message stream.
   * @param message
   */
  info(message: string) {
    this.message(message, 'info');
  }

  /**
   * Send a success message to the message stream.
   * @param message
   */
  success(message: string) {
    this.message(message, 'success');
  }

  /**
   * Send a warning message to the message stream.
   * @param message
   */
  warning(message: string) {
    this.message(message, 'warning');
  }

  onInit() {
    this.messages$
      .asObservable()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(({ level, message }) => {
        // We'll always log the message to the console.
        console.info(`[${level || 'info'}] : ${message}`);
      });

    this.errors$
      .asObservable()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(({ error, stack }) => {
        // We'll always log the error to the console.
        console.error(typeof error === 'string' ? `[error]: ${error}` : error);

        if (stack) console.error(`[stack]: ${stack}`);
      });
  }
}
