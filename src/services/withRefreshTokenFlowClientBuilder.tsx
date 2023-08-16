import { ClientBuilder } from '@commercetools/sdk-client-v2';
import { authMiddlewareOptionsForRefreshTokenFlow, httpMiddlewareOptions } from './authAndHttpMiddlewareOptionsSetter';
import { API_ADMIN_CLIENT_DETAILS } from './apiClientDetailsSetter';

export const refreshTokenFlowCtpClient = new ClientBuilder()
  .withRefreshTokenFlow(authMiddlewareOptionsForRefreshTokenFlow(API_ADMIN_CLIENT_DETAILS))
  .withHttpMiddleware(httpMiddlewareOptions())
  .withLoggerMiddleware()
  .build();
