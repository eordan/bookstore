import { createApiBuilderFromCtpClient, CustomerUpdateAction, Customer } from '@commercetools/platform-sdk';
import { getSetCustomers } from '../flows/withClientCredentialsFlowClientBuilder';
import { BaseAddress } from '../../utils/types';
import { ProfileActions } from '../../utils/enums';
import { PROJECT_KEY } from '../helpers/apiClientDetailsSetter';

export const changeEmail = (email: string): CustomerUpdateAction => {
  return {
    action: ProfileActions.changeEmail,
    email,
  };
};

export const setFirstName = (firstName: string): CustomerUpdateAction => {
  return {
    action: ProfileActions.setFirstName,
    firstName,
  };
};

export const setLastName = (lastName: string): CustomerUpdateAction => {
  return {
    action: ProfileActions.setLastName,
    lastName,
  };
};

export const addAddress = (address: BaseAddress): CustomerUpdateAction => {
  return {
    action: ProfileActions.addAddress,
    address,
  };
};

export const changeAddress = (addressId: string, address: BaseAddress): CustomerUpdateAction => {
  return {
    action: ProfileActions.changeAddress,
    addressId,
    address,
  };
};

export const removeAddress = (addressId: string): CustomerUpdateAction => {
  return {
    action: ProfileActions.removeAddress,
    addressId,
  };
};

export const setDefaultShippingAddress = (addressId?: string): CustomerUpdateAction => {
  return {
    action: ProfileActions.setDefaultShippingAddress,
    addressId,
  };
};

export const addShippingAddressId = (addressId: string): CustomerUpdateAction => {
  return {
    action: ProfileActions.addShippingAddressId,
    addressId,
  };
};

export const removeShippingAddressId = (addressId: string): CustomerUpdateAction => {
  return {
    action: ProfileActions.removeShippingAddressId,
    addressId,
  };
};

export const setDefaultBillingAddress = (addressId?: string): CustomerUpdateAction => {
  return {
    action: ProfileActions.setDefaultBillingAddress,
    addressId,
  };
};

export const addBillingAddressId = (addressId: string): CustomerUpdateAction => {
  return {
    action: ProfileActions.addBillingAddressId,
    addressId,
  };
};

export const removeBillingAddressId = (addressId: string): CustomerUpdateAction => {
  return {
    action: ProfileActions.removeBillingAddressId,
    addressId,
  };
};

export const setDateOfBirth = (birthday: string): CustomerUpdateAction => {
  const dateOfBirth = new Date(birthday).toISOString().split('T')[0];

  return {
    action: ProfileActions.setDateOfBirth,
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
