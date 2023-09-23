import { createApiBuilderFromCtpClient, Customer } from '@commercetools/platform-sdk';
import { getSetCustomers } from '../flows/withClientCredentialsFlowClientBuilder';
import { PROJECT_KEY } from '../helpers/apiClientDetailsSetter';

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
