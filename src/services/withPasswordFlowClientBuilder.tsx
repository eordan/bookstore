import { ClientBuilder } from '@commercetools/sdk-client-v2';
import { authMiddlewareOptionsForPasswordFlow, httpMiddlewareOptions } from './authAndHttpMiddlewareOptionsSetter';
import { API_MANAGE_PROFILE_SCOPE } from './apiClientDetailsSetter';

export const loginUserCtpClient = (username: string, password: string) => {
  const ctpClient = new ClientBuilder()
    .withPasswordFlow(authMiddlewareOptionsForPasswordFlow(API_MANAGE_PROFILE_SCOPE, username, password))
    .withHttpMiddleware(httpMiddlewareOptions())
    .withLoggerMiddleware()
    .build();

  return ctpClient;
};
