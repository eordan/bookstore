import { loginCustomer } from '../../src/services/customerAuther';

test('should make an API request and return the response', async () => {
  const request = {
    email: 'testemail@domain.com',
    password: '12345!aA',
  };

  const data = await loginCustomer(request);

  expect(typeof data.customer.id).toBe('string');
});
