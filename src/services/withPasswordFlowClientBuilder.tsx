import {
  ClientBuilder,
  type PasswordAuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import fetch from 'node-fetch';
import { API_CLIENT_DETAILS } from './apiClientDetailsSetter';

export const ctpClient = (username: string, password: string) => {
  const withPasswordFlowAuthMiddlewareOptions: PasswordAuthMiddlewareOptions = {
    host: `https://auth.${API_CLIENT_DETAILS.region}.commercetools.com`,
    projectKey: API_CLIENT_DETAILS.projectKey,
    credentials: {
      clientId: API_CLIENT_DETAILS.clientId,
      clientSecret: API_CLIENT_DETAILS.clientSecret,
      user: {
        username,
        password,
      },
    },
    scopes: [API_CLIENT_DETAILS.scopes],
    fetch,
  };

  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: `https://api.${API_CLIENT_DETAILS.region}.commercetools.com`,
    fetch,
  };

  const ctpClientCreator = new ClientBuilder()
    .withPasswordFlow(withPasswordFlowAuthMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();

  return ctpClientCreator;
};
