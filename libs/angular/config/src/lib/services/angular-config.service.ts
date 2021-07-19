import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, shareReplay, switchMap, take, takeUntil } from 'rxjs/operators';

import {
  AngularConfig,
  AngularConfigOptions,
  AngularConfigService,
} from '../interfaces';

import { Unsubscriber } from '@tractr/angular-tools';

export function AngularConfigServiceFactory<
  T extends AngularConfig = AngularConfig,
>(
  http: HttpClient,
  angularConfigOptions: AngularConfigOptions<T>,
): AngularConfigService<T> {
  class AnonymousAngularConfigService extends Unsubscriber {
    constructor() {
      super();

      this.config$.pipe(takeUntil(this.unsubscribe$)).subscribe((value) => {
        this.value$.next(value);
      });
    }

    refresh$ = new BehaviorSubject<T | undefined>(undefined);

    value$ = new BehaviorSubject<T | undefined>(undefined);

    getConfig$ = http
      .get<AngularConfig>(angularConfigOptions.apiEndpoint)
      .pipe(map(angularConfigOptions.getConfig));

    config$: Observable<T> = this.refresh$.pipe(
      switchMap((next) => {
        if (typeof next === 'undefined') return this.getConfig$;
        return of(next);
      }),
      shareReplay(1),
    );

    waitInitialisationConfig$: Observable<T> = this.config$.pipe(take(1));

    get config() {
      return this.value$.getValue();
    }

    set config(value: T | undefined) {
      this.refresh$.next(value);
    }
  }
  return new AnonymousAngularConfigService();
}