import { CustomerSignInResult, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { viewCustomersCtpClient, manageCustomersCtpClient } from './withClientCredentialsFlowClientBuilder';
import { CustomerDraft, BaseAddress, EmailCheck } from '../../utils/types';
import { PROJECT_KEY } from './apiClientDetailsSetter';

export const getCustomerDetails = (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  dateOfBirth: string,
  isBillingTheSame: boolean,
  shippingAddress: BaseAddress,
  isShippingDefault: boolean,
  billingAddress: BaseAddress,
  isBillingDefault: boolean,
): CustomerDraft => {
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

// Register customer through `me` endpoint
export const createCustomerThroughMe = async (customerDetails: CustomerDraft): Promise<CustomerSignInResult> => {
  const apiRoot = createApiBuilderFromCtpClient(manageCustomersCtpClient).withProjectKey({
    projectKey: PROJECT_KEY,
  });

  const data = apiRoot
    .me()
    .signup()
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

// Register customer through `customers` endpoint
export const createCustomerThroughCustomers = async (customerDetails: CustomerDraft): Promise<CustomerSignInResult> => {
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
