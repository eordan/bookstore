import {
  createApiBuilderFromCtpClient,
  ClientResponse,
  MyCustomerSignin,
  CustomerSignInResult,
} from '@commercetools/platform-sdk';
import { ctpClient } from './withPasswordFlowClientBuilder';
import { API_CLIENT_DETAILS } from './apiClientDetailsSetter';

const request: MyCustomerSignin = {
  email: 'request@final.com',
  password: 'tR6dZY32uR5UR52',
};

const apiRoot = createApiBuilderFromCtpClient(ctpClient(request.email, request.password)).withProjectKey({
  projectKey: API_CLIENT_DETAILS.projectKey,
});

export const loginCustomer = async (body: MyCustomerSignin): Promise<ClientResponse<CustomerSignInResult>> => {
  const data = apiRoot
    .me()
    .login()
    .post({ body })
    .execute()
    .then()
    .catch((error) => {
      throw error;
    });

  return data;
};
