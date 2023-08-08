import { apiRoot } from './client';
import { CustomerDraft } from '../../utils/types';

export function createCustomer(customerDetails: CustomerDraft) {
  return apiRoot
    .customers()
    .post({
      // The CustomerDraft is the object within the body
      body: customerDetails,
    })
    .execute();
}
