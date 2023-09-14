import { createApiBuilderFromCtpClient, MyCustomerSignin, CustomerSignInResult } from '@commercetools/platform-sdk';
import { loginUserCtpClient } from '../flows/withPasswordFlowClientBuilder';
import { PROJECT_KEY } from '../helpers/apiClientDetailsSetter';

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
