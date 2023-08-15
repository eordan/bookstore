import { type AuthMiddlewareOptions, type HttpMiddlewareOptions } from '@commercetools/sdk-client-v2';
import fetch from 'node-fetch';
import { ApiClientDetails } from '../../utils/types';
import { PROJECT_KEY } from './apiClientDetailsSetter';

export const authMiddlewareOptions = (details: ApiClientDetails) => {
  const options: AuthMiddlewareOptions = {
    host: `https://auth.${details.region}.commercetools.com`,
    projectKey: PROJECT_KEY,
    credentials: {
      clientId: details.clientId,
      clientSecret: details.clientSecret,
    },
    scopes: [details.scopes],
    fetch,
  };

  return options;
};

export const httpMiddlewareOptions = (details: ApiClientDetails) => {
  const options: HttpMiddlewareOptions = {
    host: `https://api.${details.region}.commercetools.com`,
    fetch,
  };

  return options;
};
