import { createApiBuilderFromCtpClient, ProductProjectionPagedSearchResponse } from '@commercetools/platform-sdk';
import { searchProductsCtpClient } from './withClientCredentialsFlowClientBuilder';
import { ProductProjectionsQueryParameters } from '../utils/types';
import { PROJECT_KEY } from './apiClientDetailsSetter';

export const getQueryDetails = (
  text: string | undefined = undefined,
  filter: string | string[] | undefined = undefined,
  sort: string | undefined = 'variants.attributes.rating desc',
  fuzzy: boolean = true,
  limit: number = 15,
  offset: number = 0,
) => {
  return {
    text,
    fuzzy,
    limit,
    offset,
    filter,
    sort,
  };
};

export const searchProducts = async (
  params: ProductProjectionsQueryParameters,
): Promise<ProductProjectionPagedSearchResponse> => {
  const apiRoot = createApiBuilderFromCtpClient(searchProductsCtpClient).withProjectKey({
    projectKey: PROJECT_KEY,
  });

  const data = apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        'text.en': params.text,
        fuzzy: params.fuzzy,
        limit: params.limit,
        offset: params.offset,
        filter: params.filter,
        sort: params.sort,
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
