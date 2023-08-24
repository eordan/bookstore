import fetch from 'node-fetch';
import {
  authMiddlewareOptionsForClientCredentialsFlow,
  authMiddlewareOptionsForPasswordFlow,
} from '../../src/services/authAndHttpMiddlewareOptionsSetter';
import { API_ADMIN_SCOPE, PROJECT_KEY } from '../../src/services/apiClientDetailsSetter';

describe('authMiddlewareOptionsForClientCredentialsFlow', () => {
  it('should return AuthMiddlewareOptions with the correct properties', () => {
    const result = authMiddlewareOptionsForClientCredentialsFlow(API_ADMIN_SCOPE);

    const mockObbject = {
      host: API_ADMIN_SCOPE.authUrl,
      projectKey: PROJECT_KEY,
      credentials: {
        clientId: API_ADMIN_SCOPE.clientId,
        clientSecret: API_ADMIN_SCOPE.clientSecret,
      },
      scopes: [API_ADMIN_SCOPE.scopes],
      fetch,
    };

    expect(`${result}`).toEqual(`${mockObbject}`);
  });

  it('should return AuthMiddlewareOptions with the correct properties', () => {
    const username = 'username';
    const password = 'password';

    const result = authMiddlewareOptionsForPasswordFlow(API_ADMIN_SCOPE, username, password);

    const mockObbject = {
      host: API_ADMIN_SCOPE.authUrl,
      projectKey: PROJECT_KEY,
      credentials: {
        clientId: API_ADMIN_SCOPE.clientId,
        clientSecret: API_ADMIN_SCOPE.clientSecret,
        user: {
          username: 'username',
          password: 'password',
        },
      },
      scopes: [API_ADMIN_SCOPE.scopes],
      fetch,
    };

    expect(`${result}`).toEqual(`${mockObbject}`);
  });
});
