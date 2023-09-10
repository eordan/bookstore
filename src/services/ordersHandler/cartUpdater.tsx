import { Cart, createApiBuilderFromCtpClient, MyCartUpdateAction } from '@commercetools/platform-sdk';
import { anonymousSessionFlowCtpClient } from '../flows/withAnonymousSessionFlowClientBuilder';
import { CartActions } from '../../utils/enums';
import { PROJECT_KEY } from '../helpers/apiClientDetailsSetter';

export const addLineItem = (productId: string, quantity: number = 1): MyCartUpdateAction => {
  return {
    action: CartActions.addLineItem,
    productId,
    quantity,
  };
};

export const updateCart = async (ID: string, version: number, actions: MyCartUpdateAction[]): Promise<Cart> => {
  const apiRoot = createApiBuilderFromCtpClient(anonymousSessionFlowCtpClient).withProjectKey({
    projectKey: PROJECT_KEY,
  });

  const data = apiRoot
    .me()
    .carts()
    .withId({ ID })
    .post({
      body: {
        version,
        actions,
      },
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
