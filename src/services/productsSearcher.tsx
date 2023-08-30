import { createApiBuilderFromCtpClient, ProductProjectionPagedSearchResponse } from '@commercetools/platform-sdk';
import { searchProductsCtpClient } from './withClientCredentialsFlowClientBuilder';
import { ProductProjectionsQueryParameters, Currency } from '../utils/types';
import { PROJECT_KEY } from './apiClientDetailsSetter';

const getCurrencyData = (country: string) => {
  let countryData: Currency;

  if (country === 'CA') {
    countryData = {
      currency: 'CAD',
      country: 'CA',
    };

    return countryData;
  }

  countryData = {
    currency: 'USD',
    country: 'US',
  };

  return countryData;
};

export const getQueryDetails = (
  text: string | undefined = undefined,
  filter: string | string[] | undefined = undefined,
  sort: string | undefined = undefined,
  fuzzy: boolean = true,
  limit: number = 15,
  offset: number = 15,
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

export const getCategoriesList = () => {
  const apiRoot = createApiBuilderFromCtpClient(searchProductsCtpClient).withProjectKey({
    projectKey: PROJECT_KEY,
  });

  const data = apiRoot
    .categories()
    .get({
      queryArgs: {
        limit: 500,
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
