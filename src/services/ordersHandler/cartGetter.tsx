import { Cart, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { anonymousSessionFlowCtpClient } from '../flows/withAnonymousSessionFlowClientBuilder';
import { getSetCustomers } from '../flows/withClientCredentialsFlowClientBuilder';
import { PROJECT_KEY } from '../helpers/apiClientDetailsSetter';

export const getAnonumousCart = async (): Promise<Cart> => {
  const apiRoot = createApiBuilderFromCtpClient(anonymousSessionFlowCtpClient).withProjectKey({
    projectKey: PROJECT_KEY,
  });

  const data = apiRoot
    .me()
    .activeCart()
    .get()
    .execute()
    .then(({ body }) => {
      return body;
    })
    .catch((error) => {
      throw error;
    });

  return data;
};

export const getCustomerCart = async (ID: string): Promise<Cart> => {
  const apiRoot = createApiBuilderFromCtpClient(getSetCustomers).withProjectKey({
    projectKey: PROJECT_KEY,
  });

  const data = apiRoot
    .carts()
    .withId({ ID })
    .get()
    .execute()
    .then(({ body }) => {
      return body;
    })
    .catch((error) => {
      throw error;
    });

  return data;
};
