import { ClientBuilder, type AuthMiddlewareOptions, type HttpMiddlewareOptions } from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import fetch from 'node-fetch';
import { API_CLIENT_DETAILS } from './apiClientDetailsSetter';

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: `https://auth.${API_CLIENT_DETAILS.region}.commercetools.com`,
  projectKey: API_CLIENT_DETAILS.projectKey,
  credentials: {
    clientId: API_CLIENT_DETAILS.clientId,
    clientSecret: API_CLIENT_DETAILS.clientSecret,
  },
  scopes: [API_CLIENT_DETAILS.scopes],
  fetch,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: `https://api.${API_CLIENT_DETAILS.region}.commercetools.com`,
  fetch,
};

export const ctpClient = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

export const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: API_CLIENT_DETAILS.projectKey,
});
