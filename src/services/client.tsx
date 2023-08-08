// import { ApiRoot, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ctpClient } from './buildClient';
import { setApiClientDetails } from './apiClientDetailsSetter';

const API_CLIENT_DETAILS = setApiClientDetails();

// Create apiRoot from the imported ClientBuilder and include your Project key
export const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: API_CLIENT_DETAILS.projectKey,
});
