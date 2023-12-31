import { ClientBuilder } from '@commercetools/sdk-client-v2';
import {
  authMiddlewareOptionsForClientCredentialsFlow,
  httpMiddlewareOptions,
} from '../helpers/authAndHttpMiddlewareOptionsSetter';
import { API_VIEW_CUSTOMERS_SCOPE, API_MANAGE_PROFILE_SCOPE, API_ADMIN_SCOPE } from '../helpers/apiClientDetailsSetter';

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

export const getSetCustomers = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptionsForClientCredentialsFlow(API_ADMIN_SCOPE))
  .withHttpMiddleware(httpMiddlewareOptions())
  .withLoggerMiddleware()
  .build();
