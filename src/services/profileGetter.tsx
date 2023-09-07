import { createApiBuilderFromCtpClient, Customer } from '@commercetools/platform-sdk';
import { getSetCustomers } from './withClientCredentialsFlowClientBuilder';
import { PROJECT_KEY } from './apiClientDetailsSetter';

export const getCustomer = (ID: string): Promise<Customer> => {
  const apiRoot = createApiBuilderFromCtpClient(getSetCustomers).withProjectKey({
    projectKey: PROJECT_KEY,
  });

  return apiRoot
    .customers()
    .withId({ ID })
    .get()
    .execute()
    .then(({ body }) => {
      return body;
    })
    .catch((error) => {
      return error;
    });
};
