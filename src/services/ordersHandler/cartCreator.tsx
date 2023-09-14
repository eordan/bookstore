import { Cart, MyCartDraft, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { anonymousSessionFlowCtpClient } from '../flows/withAnonymousSessionFlowClientBuilder';
import { refreshTokenFlowCtpClient } from '../flows/withRefreshTokenFlowClientBuilder';
import { PROJECT_KEY } from '../helpers/apiClientDetailsSetter';

export const createAnonimousCart = async (cartDetails: MyCartDraft): Promise<Cart> => {
  const apiRoot = createApiBuilderFromCtpClient(anonymousSessionFlowCtpClient).withProjectKey({
    projectKey: PROJECT_KEY,
  });

  const data = apiRoot
    .me()
    .carts()
    .post({
      body: cartDetails,
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

export const createCart = async (cartDetails: MyCartDraft): Promise<Cart> => {
  const apiRoot = createApiBuilderFromCtpClient(refreshTokenFlowCtpClient).withProjectKey({
    projectKey: PROJECT_KEY,
  });

  const data = apiRoot
    .me()
    .carts()
    .post({
      body: cartDetails,
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
