import {
  type AuthMiddlewareOptions,
  type PasswordAuthMiddlewareOptions,
  type AnonymousAuthMiddlewareOptions,
  type RefreshAuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  TokenStore,
} from '@commercetools/sdk-client-v2';
import fetch from 'node-fetch';
import { ApiClientDetails } from '../../utils/types';
import { PROJECT_KEY, REGION } from './apiClientDetailsSetter';

export const authMiddlewareOptionsForClientCredentialsFlow = (details: ApiClientDetails): AuthMiddlewareOptions => {
  return {
    host: `https://auth.${details.region}.commercetools.com`,
    projectKey: PROJECT_KEY,
    credentials: {
      clientId: details.clientId,
      clientSecret: details.clientSecret,
    },
    scopes: [details.scopes],
    fetch,
  };
};

export const authMiddlewareOptionsForPasswordFlow = (
  details: ApiClientDetails,
  username: string,
  password: string,
): PasswordAuthMiddlewareOptions => {
  return {
    host: `https://auth.${details.region}.commercetools.com`,
    projectKey: PROJECT_KEY,
    credentials: {
      clientId: details.clientId,
      clientSecret: details.clientSecret,
      user: {
        username,
        password,
      },
    },
    tokenCache: {
      get: (): TokenStore => {
        const token = JSON.parse(localStorage.getItem('custTokenDevision') as string);
        return token;
      },
      set: (token: TokenStore) => {
        localStorage.setItem('custTokenDevision', JSON.stringify(token));
      },
    },
    scopes: [details.scopes],
    fetch,
  };
};

export const authMiddlewareOptionsForAnonymousSessionFlow = (
  details: ApiClientDetails,
): AnonymousAuthMiddlewareOptions => {
  return {
    host: `https://auth.${details.region}.commercetools.com`,
    projectKey: PROJECT_KEY,
    credentials: {
      clientId: details.clientId,
      clientSecret: details.clientSecret,
    },
    tokenCache: {
      get: (): TokenStore => {
        const token = JSON.parse(localStorage.getItem('anonTokenDevision') as string);
        return token;
      },
      set: (token: TokenStore) => {
        localStorage.setItem('anonTokenDevision', JSON.stringify(token));
      },
    },
    scopes: [details.scopes],
    fetch,
  };
};

export const authMiddlewareOptionsForRefreshTokenFlow = (details: ApiClientDetails): RefreshAuthMiddlewareOptions => {
  return {
    host: `https://auth.${details.region}.commercetools.com`,
    projectKey: PROJECT_KEY,
    credentials: {
      clientId: details.clientId,
      clientSecret: details.clientSecret,
    },
    tokenCache: {
      get: (): TokenStore => {
        const token = JSON.parse(localStorage.getItem('custTokenDevision') as string);
        return token;
      },
      set: (token: TokenStore) => {
        localStorage.setItem('custTokenDevision', JSON.stringify(token));
      },
    },
    refreshToken: JSON.parse(localStorage.getItem('custTokenDevision') as string).refreshToken,
    fetch,
  };
};

export const httpMiddlewareOptions = (): HttpMiddlewareOptions => {
  return {
    host: `https://api.${REGION}.commercetools.com`,
    fetch,
  };
};
