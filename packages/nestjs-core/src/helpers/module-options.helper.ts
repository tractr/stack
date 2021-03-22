import {
  DynamicModule,
  FactoryProvider,
  ModuleMetadata,
  Provider,
  Type,
} from '@nestjs/common';

export interface Options {
  [key: string]: unknown;
}

export interface OptionsFactory<O = Options> {
  createOptions(defaultOptions: Record<string, unknown>): Promise<O> | O;
}

export interface AsyncOptions<
  O,
  F extends OptionsFactory<O> = OptionsFactory<O>
> extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<F>;
  useClass?: Type<F>;
  useFactory?: (...args: unknown[]) => Promise<O> | O;
  inject?: FactoryProvider['inject'];
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function ModuleOptionsHelper<
  O,
  F extends OptionsFactory<O> = OptionsFactory<O>
>(moduleOptionsProvide: string, defaultOptions: Record<string, unknown> = {}) {
  return class ModuleOptions {
    static register(options: O): DynamicModule {
      return {
        module: this,
        providers: [
          {
            provide: moduleOptionsProvide,
            useValue: { ...defaultOptions, ...options },
          },
        ],
        exports: [moduleOptionsProvide],
      };
    }

    static registerAsync(options: AsyncOptions<O, F>): DynamicModule {
      return {
        module: this,
        imports: options.imports || [],
        providers: this.createAsyncProviders(options),
        exports: [moduleOptionsProvide],
      };
    }

    static createAsyncProviders(options: AsyncOptions<O, F>): Provider[] {
      if (options.useExisting || options.useFactory) {
        return [this.createAsyncOptionsProvider(options)];
      }

      if (options.useClass) {
        return [
          this.createAsyncOptionsProvider(options),
          {
            provide: options.useClass,
            useClass: options.useClass,
          },
        ];
      }

      return [];
    }

    static createAsyncOptionsProvider(options: AsyncOptions<O, F>): Provider {
      if (options.useFactory) {
        return {
          provide: moduleOptionsProvide,
          useFactory: options.useFactory,
          inject: options.inject || [],
        };
      }

      return {
        provide: moduleOptionsProvide,
        useFactory: async (optionsFactory: F) =>
          optionsFactory.createOptions(defaultOptions),
        ...(options.useExisting ? { inject: [options.useExisting] } : {}),
        ...(options.useClass ? { inject: [options.useClass] } : {}),
      };
    }
  };
}
