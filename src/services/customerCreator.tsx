import { CustomerSignInResult, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { viewCustomersCtpClient, manageCustomersCtpClient } from './withClientCredentialsFlowClientBuilder';
import { CustomerDraft, BaseAddress, EmailCheck } from '../../utils/types';

export const getCustomerDetails = (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  dateOfBirth: string,
  isBillingTheSame: boolean,
  shippingAddress: BaseAddress,
  shippingIsDeafult: boolean,
  billingAddress: BaseAddress,
  billingIsDeafult: boolean,
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

  if (shippingIsDeafult) {
    customerDetails.defaultShippingAddress = 0;
  }

  if (billingIsDeafult) {
    const [defaultBillingAddress] = customerDetails.billingAddresses;
    customerDetails.defaultBillingAddress = defaultBillingAddress;
  }

  return customerDetails;
};

export const checkEmailAndReturnInfo = async (customerEmail: string, projectKey: string): Promise<EmailCheck> => {
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
        const emailCheck: EmailCheck = {
          emailDoesExist: false,
          message: 'This email address has not been registered.',
        };
        return emailCheck;
      }
      const emailCheck: EmailCheck = {
        emailDoesExist: true,
        message: 'This email address has already been registered.',
      };
      return emailCheck;
    })
    .catch((error) => {
      throw error;
    });

  return data;
};

export const createCustomerThroughMe = async (
  customerDetails: CustomerDraft,
  projectKey: string,
): Promise<CustomerSignInResult> => {
  const apiRoot = createApiBuilderFromCtpClient(manageCustomersCtpClient).withProjectKey({
    projectKey,
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

export const createCustomerThroughCustomers = async (
  customerDetails: CustomerDraft,
  projectKey: string,
): Promise<CustomerSignInResult> => {
  const apiRoot = createApiBuilderFromCtpClient(manageCustomersCtpClient).withProjectKey({
    projectKey,
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
