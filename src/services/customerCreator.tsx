import { CustomerSignInResult } from '@commercetools/platform-sdk';
import { apiRoot } from './clientBuilder';
import { CustomerDraft, BaseAddress, EmailCheck } from '../../utils/types';

export const transformUserInputToCustomerDetails = (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  dateOfBirth: string,
  billingAndShippingAreSame: boolean,
  shippingAddress: BaseAddress,
  shippingIsDeafult: boolean,
  billingAddress: BaseAddress,
  billingIsDeafult: boolean,
): CustomerDraft => {
  const addresses: BaseAddress[] = (() => {
    if (billingAndShippingAreSame === true) {
      return [shippingAddress];
    }
    return [shippingAddress, billingAddress];
  })();

  const billingAddresses: number[] = (() => {
    if (billingAndShippingAreSame === true) {
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

  if (shippingIsDeafult === true) {
    customerDetails.defaultShippingAddress = 0;
  }

  if (billingIsDeafult === true) {
    const [defaultBillingAddress] = customerDetails.billingAddresses;
    customerDetails.defaultBillingAddress = defaultBillingAddress;
  }

  return customerDetails;
};

export const checkEmailAndReturnInfo = async (customerEmail: string): Promise<EmailCheck> => {
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

export const createCustomer = async (customerDetails: CustomerDraft): Promise<CustomerSignInResult> => {
  const data = await apiRoot
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
