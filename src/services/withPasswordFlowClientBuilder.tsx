import {
  ClientBuilder,
  type PasswordAuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import fetch from 'node-fetch';
import { API_CLIENT_DETAILS, PROJECT_KEY } from './apiClientDetailsSetter';

export const withPasswordFlowCtpClient = (username: string, password: string) => {
  const withPasswordFlowAuthMiddlewareOptions: PasswordAuthMiddlewareOptions = {
    host: `https://auth.${API_CLIENT_DETAILS.region}.commercetools.com`,
    projectKey: PROJECT_KEY,
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

  const ctpClient = new ClientBuilder()
    .withPasswordFlow(withPasswordFlowAuthMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();

  return ctpClient;
};
