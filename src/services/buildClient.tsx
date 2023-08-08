import fetch from 'node-fetch';
import {
  ClientBuilder,

  // Import middlewares
  type AuthMiddlewareOptions, // Required for auth
  type HttpMiddlewareOptions, // Required for sending HTTP requests
} from '@commercetools/sdk-client-v2';
import { setApiClientDetails } from './apiClientDetailsSetter';

const API_CLIENT_DETAILS = setApiClientDetails();

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: `https://auth.${API_CLIENT_DETAILS.region}.commercetools.com`,
  projectKey: API_CLIENT_DETAILS.projectKey as string,
  credentials: {
    clientId: API_CLIENT_DETAILS.clientId as string,
    clientSecret: API_CLIENT_DETAILS.clientSecret,
  },
  scopes: [API_CLIENT_DETAILS.scopes],
  fetch,
};

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: `https://api.${API_CLIENT_DETAILS.region}.commercetools.com`,
  fetch,
};

// Export the ClientBuilder
export const ctpClient = new ClientBuilder()
  .withProjectKey(API_CLIENT_DETAILS.projectKey) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware() // Include middleware for logging
  .build();
