import { ClientBuilder } from '@commercetools/sdk-client-v2';
import { authMiddlewareOptions, httpMiddlewareOptions } from './authAndHttpMiddlewareOptionsSetter';
import { API_VIEW_CUSTOMERS_CLIENT_DETAILS } from './apiClientDetailsSetter';

export const viewCustomersCtpClient = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptions(API_VIEW_CUSTOMERS_CLIENT_DETAILS))
  .withHttpMiddleware(httpMiddlewareOptions(API_VIEW_CUSTOMERS_CLIENT_DETAILS))
  .withLoggerMiddleware()
  .build();
