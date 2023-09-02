import { ClientBuilder } from '@commercetools/sdk-client-v2';
import {
  authMiddlewareOptionsForClientCredentialsFlow,
  httpMiddlewareOptions,
} from './authAndHttpMiddlewareOptionsSetter';
import { API_VIEW_CUSTOMERS_SCOPE, API_MANAGE_PROFILE_SCOPE, API_ADMIN_SCOPE } from './apiClientDetailsSetter';

export const viewCustomersCtpClient = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptionsForClientCredentialsFlow(API_VIEW_CUSTOMERS_SCOPE))
  .withHttpMiddleware(httpMiddlewareOptions())
  .withLoggerMiddleware()
  .build();

export const manageCustomersCtpClient = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptionsForClientCredentialsFlow(API_MANAGE_PROFILE_SCOPE))
  .withHttpMiddleware(httpMiddlewareOptions())
  .withLoggerMiddleware()
  .build();

export const searchProductsCtpClient = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptionsForClientCredentialsFlow(API_ADMIN_SCOPE))
  .withHttpMiddleware(httpMiddlewareOptions())
  .withLoggerMiddleware()
  .build();

export const saveTokenCtpClient = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptionsForClientCredentialsFlow(API_ADMIN_SCOPE))
  .withHttpMiddleware(httpMiddlewareOptions())
  .withLoggerMiddleware()
  .build();
