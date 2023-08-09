import { apiRoot } from './clientBuilder';
import { CustomerDraft } from '../../utils/types';

export function createCustomer(customerDetails: CustomerDraft) {
  return apiRoot
    .customers()
    .post({
      body: customerDetails,
    })
    .execute();
}
