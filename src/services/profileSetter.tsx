import { createApiBuilderFromCtpClient, CustomerUpdateAction, Customer } from '@commercetools/platform-sdk';
import { getSetCustomers } from './withClientCredentialsFlowClientBuilder';
import { BaseAddress } from '../utils/types';
import { Actions } from '../utils/enums';
import { PROJECT_KEY } from './apiClientDetailsSetter';

export const changeEmail = (email: string) => {
  return {
    action: Actions.changeEmail,
    email,
  };
};

export const setFirstName = (firstName: string) => {
  return {
    action: Actions.setFirstName,
    firstName,
  };
};

export const setLastName = (lastName: string) => {
  return {
    action: Actions.setLastName,
    lastName,
  };
};

export const addAddress = (addressId: string, address: BaseAddress) => {
  return {
    action: Actions.addAddress,
    address,
  };
};

export const changeAddress = (addressId: string, email: string) => {
  return {
    action: Actions.changeAddress,
    addressId,
    email,
  };
};

export const removeAddress = (addressId: string) => {
  return {
    action: Actions.removeAddress,
    addressId,
  };
};

export const setDefaultShippingAddress = (addressId: string) => {
  return {
    action: Actions.setDefaultShippingAddress,
    addressId,
  };
};

export const addShippingAddressId = (addressId: string) => {
  return {
    action: Actions.addShippingAddressId,
    addressId,
  };
};

export const removeShippingAddressId = (addressId: string) => {
  return {
    action: Actions.removeShippingAddressId,
    addressId,
  };
};

export const setDefaultBillingAddress = (addressId: string) => {
  return {
    action: Actions.setDefaultBillingAddress,
    addressId,
  };
};

export const addBillingAddressId = (addressId: string) => {
  return {
    action: Actions.addBillingAddressId,
    addressId,
  };
};

export const removeBillingAddressId = (addressId: string) => {
  return {
    action: Actions.removeBillingAddressId,
    addressId,
  };
};

export const setDateOfBirth = (birthday: string) => {
  const dateOfBirth = new Date(birthday).toISOString().split('T')[0];

  return {
    action: Actions.setDateOfBirth,
    dateOfBirth,
  };
};

export const updateCustomer = (ID: string, version: number, actions: CustomerUpdateAction[]): Promise<Customer> => {
  const apiRoot = createApiBuilderFromCtpClient(getSetCustomers).withProjectKey({
    projectKey: PROJECT_KEY,
  });

  return apiRoot
    .customers()
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
      return error;
    });
};

export const updateCustomerPassword = (
  ID: string,
  version: number,
  currentPassword: string,
  newPassword: string,
): Promise<Customer> => {
  const apiRoot = createApiBuilderFromCtpClient(getSetCustomers).withProjectKey({
    projectKey: PROJECT_KEY,
  });

  return apiRoot
    .customers()
    .password()
    .post({
      body: {
        id: ID,
        version,
        currentPassword,
        newPassword,
      },
    })
    .execute()
    .then(({ body }) => {
      return body;
    })
    .catch((error) => {
      return error;
    });
};
