import { CustomerSignInResult, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import toAlpha2 from 'iso-3166-1-alpha-2';
import { viewCustomersCtpClient, manageCustomersCtpClient } from '../flows/withClientCredentialsFlowClientBuilder';
import { CustomerDraft, BaseAddress, EmailCheck } from '../../utils/types';
import { PROJECT_KEY } from '../helpers/apiClientDetailsSetter';

export const getCustomerDetails = (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  birthday: string,
  isBillingTheSame: boolean,
  shippingCountry: string,
  shippingStreet: string,
  shippingPostalCode: string,
  shippingCity: string,
  isShippingDefault: boolean,
  billingCountry: string,
  billingStreet: string,
  billingPostalCode: string,
  billingCity: string,
  isBillingDefault: boolean,
): CustomerDraft => {
  const shippingCountryCode = toAlpha2.getCode(shippingCountry) as string;
  const billingCountryCode = toAlpha2.getCode(billingCountry) as string;

  const shippingAddress: BaseAddress = {
    country: shippingCountryCode,
    streetName: shippingStreet,
    postalCode: shippingPostalCode,
    city: shippingCity,
  };

  const billingAddress: BaseAddress = {
    country: billingCountryCode,
    streetName: billingStreet,
    postalCode: billingPostalCode,
    city: billingCity,
  };

  const addresses: BaseAddress[] = (() => {
    if (isBillingTheSame) {
      return [shippingAddress];
    }
    return [shippingAddress, billingAddress];
  })();

  const billingAddresses: number[] = (() => {
    if (isBillingTheSame) {
      return [0];
    }
    return [1];
  })();

  const dateOfBirth = new Date(birthday).toISOString().split('T')[0];

  const customerDetails: CustomerDraft = {
    email,
    password,
    firstName,
    lastName,
    dateOfBirth,
    addresses,
    shippingAddresses: [0],
    billingAddresses,
  };

  if (isShippingDefault) {
    customerDetails.defaultShippingAddress = 0;
  }

  if (isBillingDefault) {
    const [defaultBillingAddress] = customerDetails.billingAddresses;
    customerDetails.defaultBillingAddress = defaultBillingAddress;
  }

  return customerDetails;
};

export const checkEmail = async (customerEmail: string, projectKey: string): Promise<EmailCheck> => {
  const apiRoot = createApiBuilderFromCtpClient(viewCustomersCtpClient).withProjectKey({
    projectKey,
  });

  const data = await apiRoot
    .customers()
    .get({
      queryArgs: {
        where: `email="${customerEmail}"`,
      },
    })
    .execute()
    .then(({ body }) => {
      if (body.results.length === 0) {
        return {
          emailDoesExist: false,
          message: 'This email address has not been registered.',
        };
      }
      return {
        emailDoesExist: true,
        message: 'This email address has already been registered.',
      };
    })
    .catch((error) => {
      throw error;
    });

  return data;
};

export const createCustomer = async (customerDetails: CustomerDraft): Promise<CustomerSignInResult> => {
  const apiRoot = createApiBuilderFromCtpClient(manageCustomersCtpClient).withProjectKey({
    projectKey: PROJECT_KEY,
  });

  const data = apiRoot
    .customers()
    .post({
      body: customerDetails,
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
