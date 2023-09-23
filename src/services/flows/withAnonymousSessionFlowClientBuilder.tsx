import { ClientBuilder } from '@commercetools/sdk-client-v2';
import {
  authMiddlewareOptionsForAnonymousSessionFlow,
  httpMiddlewareOptions,
} from '../helpers/authAndHttpMiddlewareOptionsSetter';
import { API_ADMIN_SCOPE } from '../helpers/apiClientDetailsSetter';

export const anonymousSessionFlowCtpClient = new ClientBuilder()
  .withAnonymousSessionFlow(authMiddlewareOptionsForAnonymousSessionFlow(API_ADMIN_SCOPE))
  .withHttpMiddleware(httpMiddlewareOptions())
  .withLoggerMiddleware()
  .build();
