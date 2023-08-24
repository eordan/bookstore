import {
  type AuthMiddlewareOptions,
  type PasswordAuthMiddlewareOptions,
  type AnonymousAuthMiddlewareOptions,
  type RefreshAuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import fetch from 'node-fetch';
import { ApiClientDetails } from '../utils/types';
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
    refreshToken: 'bXvTyxc5yuebdvwTwyXn==',
    fetch,
  };
};

export const httpMiddlewareOptions = (): HttpMiddlewareOptions => {
  return {
    host: `https://api.${REGION}.commercetools.com`,
    fetch,
  };
};
