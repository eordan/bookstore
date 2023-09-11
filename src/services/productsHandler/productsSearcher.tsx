import { createApiBuilderFromCtpClient, ProductProjectionPagedSearchResponse } from '@commercetools/platform-sdk';
import { searchProductsCtpClient } from '../flows/withClientCredentialsFlowClientBuilder';
import { ProductProjectionsQueryParameters, Currency, type StringUndefined } from '../../utils/types';
import { PROJECT_KEY } from '../helpers/apiClientDetailsSetter';

const defaultResultsLimit = 20;

export const getCurrencyData = (country: string): Currency => {
  if (country === 'CA') {
    return {
      currency: 'CAD',
      country: 'CA',
    };
  }

  return {
    currency: 'USD',
    country: 'US',
  };
};

export const getQueryDetails = (
  text: StringUndefined = undefined,
  filter: string[] | StringUndefined = undefined,
  sort: StringUndefined = undefined,
  fuzzy: boolean = true,
  limit: number = defaultResultsLimit,
  offset: number = 0,
  country: string = 'CA',
) => {
  const currency = getCurrencyData(country);

  return {
    text,
    fuzzy,
    limit,
    offset,
    filter,
    sort,
    currency,
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
        priceCurrency: params.currency?.currency,
        priceCountry: params.currency?.country,
        withTotal: false,
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

export const getCategory = (key: string) => {
  const apiRoot = createApiBuilderFromCtpClient(searchProductsCtpClient).withProjectKey({
    projectKey: PROJECT_KEY,
  });

  const data = apiRoot
    .categories()
    .withKey({ key })
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

export const getCategoriesList = (limit: number) => {
  const apiRoot = createApiBuilderFromCtpClient(searchProductsCtpClient).withProjectKey({
    projectKey: PROJECT_KEY,
  });

  const data = apiRoot
    .categories()
    .get({
      queryArgs: {
        limit,
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

export const getProduct = (ID: string, country: string) => {
  const apiRoot = createApiBuilderFromCtpClient(searchProductsCtpClient).withProjectKey({
    projectKey: PROJECT_KEY,
  });
  const currency = getCurrencyData(country);

  const data = apiRoot
    .products()
    .withId({ ID })
    .get({
      queryArgs: {
        priceCurrency: currency.currency,
        priceCountry: currency.country,
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
