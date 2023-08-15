import {
  createApiBuilderFromCtpClient,
  ClientResponse,
  MyCustomerSignin,
  CustomerSignInResult,
} from '@commercetools/platform-sdk';
import { withPasswordFlowCtpClient } from './withPasswordFlowClientBuilder';
import { PROJECT_KEY } from './apiClientDetailsSetter';

const request: MyCustomerSignin = {
  email: 'request@final.com',
  password: 'tR6dZY32uR5UR52',
};

const apiRoot = createApiBuilderFromCtpClient(
  withPasswordFlowCtpClient(request.email, request.password),
).withProjectKey({
  projectKey: PROJECT_KEY,
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
