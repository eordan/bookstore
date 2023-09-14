import { Cart, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { anonymousSessionFlowCtpClient } from '../flows/withAnonymousSessionFlowClientBuilder';
import { PROJECT_KEY } from '../helpers/apiClientDetailsSetter';

export const getCart = async (): Promise<Cart> => {
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
