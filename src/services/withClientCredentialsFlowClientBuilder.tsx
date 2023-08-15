import { ClientBuilder } from '@commercetools/sdk-client-v2';
import {
  authMiddlewareOptionsForClientCredentialsFlow,
  httpMiddlewareOptions,
} from './authAndHttpMiddlewareOptionsSetter';
import { API_VIEW_CUSTOMERS_CLIENT_DETAILS, API_MANAGE_MY_PROFILE_CLIENT_DETAILS } from './apiClientDetailsSetter';

export const viewCustomersCtpClient = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptionsForClientCredentialsFlow(API_VIEW_CUSTOMERS_CLIENT_DETAILS))
  .withHttpMiddleware(httpMiddlewareOptions(API_VIEW_CUSTOMERS_CLIENT_DETAILS))
  .withLoggerMiddleware()
  .build();

export const manageCustomersCtpClient = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptionsForClientCredentialsFlow(API_MANAGE_MY_PROFILE_CLIENT_DETAILS))
  .withHttpMiddleware(httpMiddlewareOptions(API_MANAGE_MY_PROFILE_CLIENT_DETAILS))
  .withLoggerMiddleware()
  .build();
