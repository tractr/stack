import {
  AuthenticationApiEndpoints,
  AuthenticationModuleOptions,
  AuthenticationOptions,
} from '../types';

export function authenticationModuleOptionsFactory(
  options: AuthenticationOptions = {},
): AuthenticationModuleOptions {
  const api = options.api || {};
  const url = api?.url || '/api';
  const endpoints = {
    me: '/me',
    login: '/login',
    logout: '/logout',
    resetPassword: '/reset/password',
    ...(api?.endpoints || {}),
  };

  return {
    api: {
      url,
      endpoints,
      getEndpoint: (endpoint: AuthenticationApiEndpoints): string =>
        `${url}/${endpoints[endpoint]}`,
    },
    user: {
      validateUser:
        typeof options.user?.validateUser === 'function'
          ? options.user.validateUser
          : <U extends Record<string, unknown> = Record<string, unknown>>(
              user: unknown,
            ): user is U => true,
    },

    redirect: {
      login: options.redirect?.login || '/login',
      notLogged: options.redirect?.notLogged || '/',
    },

    initOnPageLoad: options.initOnPageLoad ?? true,
  };
}
