import { ClientBuilder } from '@commercetools/sdk-client-v2';
import {
  authMiddlewareOptionsForAnonymousSessionFlow,
  httpMiddlewareOptions,
} from './authAndHttpMiddlewareOptionsSetter';
import { API_ADMIN_CLIENT_DETAILS } from './apiClientDetailsSetter';

export const anonymousSessionFlowCtpClient = new ClientBuilder()
  .withAnonymousSessionFlow(authMiddlewareOptionsForAnonymousSessionFlow(API_ADMIN_CLIENT_DETAILS))
  .withHttpMiddleware(httpMiddlewareOptions())
  .withLoggerMiddleware()
  .build();
