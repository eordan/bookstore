import { createApiBuilderFromCtpClient, MyCustomerSignin, CustomerSignInResult } from '@commercetools/platform-sdk';
import { loginUserCtpClient } from './withPasswordFlowClientBuilder';
import { authClient } from './authAndHttpMiddlewareOptionsSetter';
import { PROJECT_KEY, API_ADMIN_SCOPE } from './apiClientDetailsSetter';

export const loginCustomer = (request: MyCustomerSignin): Promise<CustomerSignInResult> => {
  const apiRoot = createApiBuilderFromCtpClient(loginUserCtpClient(request.email, request.password)).withProjectKey({
    projectKey: PROJECT_KEY,
  });

  return apiRoot
    .me()
    .login()
    .post({
      body: request,
    })
    .execute()
    .then(({ body }) => {
      return body;
    })
    .catch((error) => {
      return error;
    });
};

export const receiveToken = async (name: string, password: string) => {
  const credentials = await authClient(API_ADMIN_SCOPE).clientCredentialsFlow(
    {
      name,
      password,
    },
    {
      disableRefreshToken: false,
    },
  );

  return credentials;
};
