import { ClientBuilder } from '@commercetools/sdk-client-v2';
import {
  authMiddlewareOptionsForRefreshTokenFlow,
  httpMiddlewareOptions,
} from '../helpers/authAndHttpMiddlewareOptionsSetter';
import { API_ADMIN_SCOPE } from '../helpers/apiClientDetailsSetter';

export const refreshTokenFlowCtpClient = new ClientBuilder()
  .withRefreshTokenFlow(authMiddlewareOptionsForRefreshTokenFlow(API_ADMIN_SCOPE))
  .withHttpMiddleware(httpMiddlewareOptions())
  .withLoggerMiddleware()
  .build();
