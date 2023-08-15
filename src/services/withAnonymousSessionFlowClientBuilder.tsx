import {
  ClientBuilder,
  type AnonymousAuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import fetch from 'node-fetch';
import { API_ADMIN_CLIENT_DETAILS, PROJECT_KEY } from './apiClientDetailsSetter';

export const withAnonymousSessionFlowCtpClient = () => {
  const authMiddlewareOptions: AnonymousAuthMiddlewareOptions = {
    host: `https://auth.${API_ADMIN_CLIENT_DETAILS.region}.commercetools.com`,
    projectKey: PROJECT_KEY,
    credentials: {
      clientId: API_ADMIN_CLIENT_DETAILS.clientId,
      clientSecret: API_ADMIN_CLIENT_DETAILS.clientSecret,
    },
    scopes: [API_ADMIN_CLIENT_DETAILS.scopes],
    fetch,
  };

  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: `https://api.${API_ADMIN_CLIENT_DETAILS.region}.commercetools.com`,
    fetch,
  };

  const ctpClient = new ClientBuilder()
    .withAnonymousSessionFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();

  return ctpClient;
};
