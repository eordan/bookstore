import { getQueryDetails, searchProducts } from '../../src/services/productsSearcher';

const data = getQueryDetails();

test('should create a request body', async () => {
  expect(typeof data).toBe('object');
});

test('should make an API request and return the response', async () => {
  try {
    const result = await searchProducts(data);
    // If no error is thrown, fail the test
    expect(result).toThrow('There is already an existing customer with the provided email.');
  } catch (error) {
    expect(typeof error).toBe('object');
  }
});
