import { createApiBuilderFromCtpClient, MyCustomerSignin, CustomerSignInResult } from '@commercetools/platform-sdk';
import { loginUserCtpClient } from './withPasswordFlowClientBuilder';
import { PROJECT_KEY } from './apiClientDetailsSetter';

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
