import {
  ClientBuilder,
  type RefreshAuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import fetch from 'node-fetch';
import { API_CLIENT_DETAILS } from './apiClientDetailsSetter';

const authMiddlewareOptions: RefreshAuthMiddlewareOptions = {
  host: `https://auth.${API_CLIENT_DETAILS.region}.commercetools.com`,
  projectKey: API_CLIENT_DETAILS.projectKey,
  credentials: {
    clientId: API_CLIENT_DETAILS.clientId,
    clientSecret: API_CLIENT_DETAILS.clientSecret,
  },
  refreshToken: 'bXvTyxc5yuebdvwTwyXn==',
  fetch,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: `https://api.${API_CLIENT_DETAILS.region}.commercetools.com`,
  fetch,
};

export const ctpClient = new ClientBuilder()
  .withRefreshTokenFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();
