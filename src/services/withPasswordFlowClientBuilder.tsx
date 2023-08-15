import { ClientBuilder } from '@commercetools/sdk-client-v2';
import { authMiddlewareOptionsForPasswordFlow, httpMiddlewareOptions } from './authAndHttpMiddlewareOptionsSetter';
import { API_MANAGE_MY_PROFILE_CLIENT_DETAILS } from './apiClientDetailsSetter';

export const loginUserCtpClient = (username: string, password: string) => {
  const ctpClient = new ClientBuilder()
    .withPasswordFlow(authMiddlewareOptionsForPasswordFlow(API_MANAGE_MY_PROFILE_CLIENT_DETAILS, username, password))
    .withHttpMiddleware(httpMiddlewareOptions(API_MANAGE_MY_PROFILE_CLIENT_DETAILS))
    .withLoggerMiddleware()
    .build();

  return ctpClient;
};
