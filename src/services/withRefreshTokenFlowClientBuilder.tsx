import {
  ClientBuilder,
  type RefreshAuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import fetch from 'node-fetch';
import { API_CLIENT_DETAILS, PROJECT_KEY } from './apiClientDetailsSetter';

export const withRefreshTokenFlowCtpClient = () => {
  const authMiddlewareOptions: RefreshAuthMiddlewareOptions = {
    host: `https://auth.${API_CLIENT_DETAILS.region}.commercetools.com`,
    projectKey: PROJECT_KEY,
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

  const ctpClient = new ClientBuilder()
    .withRefreshTokenFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();

  return ctpClient;
};
