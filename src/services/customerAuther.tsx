import { createApiBuilderFromCtpClient, MyCustomerSignin, CustomerSignInResult } from '@commercetools/platform-sdk';
import { manageCustomersCtpClient } from './withClientCredentialsFlowClientBuilder';
import { loginUserCtpClient } from './withPasswordFlowClientBuilder';
import { PROJECT_KEY } from './apiClientDetailsSetter';

export const loginCustomerThroughMe = async (request: MyCustomerSignin): Promise<CustomerSignInResult> => {
  const apiRoot = createApiBuilderFromCtpClient(loginUserCtpClient(request.email, request.password)).withProjectKey({
    projectKey: PROJECT_KEY,
  });

  const data = apiRoot
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
      throw error;
    });

  return data;
};

export const loginCustomerThroughLogin = async (request: MyCustomerSignin): Promise<CustomerSignInResult> => {
  const apiRoot = createApiBuilderFromCtpClient(manageCustomersCtpClient).withProjectKey({
    projectKey: PROJECT_KEY,
  });

  const data = apiRoot
    .login()
    .post({
      body: request,
    })
    .execute()
    .then(({ body }) => {
      return body;
    })
    .catch((error) => {
      throw error;
    });

  return data;
};
