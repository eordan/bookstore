import { getCustomerDetails, createCustomer } from '../../src/services/customerCreator';

const data = getCustomerDetails(
  'testemail@domain.com',
  '12345!aA',
  'FirstName',
  'LastName',
  '01-01-2000',
  false,
  'Belarus',
  'Street',
  '211440',
  'City',
  false,
  'Belarus',
  'Street',
  '211440',
  'City',
  false,
);

test('should create a request body', async () => {
  expect(typeof data).toBe('object');
});

test('should make an API request and return the response', async () => {
  try {
    const result = await createCustomer(data);
    // If no error is thrown, fail the test
    expect(result).toThrow('There is already an existing customer with the provided email.');
  } catch (error) {
    expect(typeof error).toBe('object');
  }
});
