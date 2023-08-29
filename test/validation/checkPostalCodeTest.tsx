import { checkPostalCode } from '../../src/utils/validation';

describe('Check postal code validation', () => {
  it('returns if postal code is valid', () => {
    const testCases = [
      { country: 'Germany', code: 'A1A 1A1', expected: false },
      { country: 'Canada', code: '000 000', expected: false },
      { country: 'Canada', code: 'A1A-1A1', expected: false },
      { country: 'Canada', code: 'B9A 8C7 ', expected: false },
      { country: 'Canada', code: ' B9A 8C7', expected: false },
      { country: 'Canada', code: 'B9A 8C7', expected: true },
      { country: 'Canada', code: 'A0A 1A1', expected: true },
      { country: 'USA', code: '123456', expected: false },
      { country: 'USA', code: '12345 ', expected: false },
      { country: 'USA', code: '12345-', expected: false },
      { country: 'USA', code: '12345 6789', expected: false },
      { country: 'USA', code: '12345-6789', expected: true },
      { country: 'USA', code: '12345', expected: true },
    ];
    testCases.forEach(({ country, code, expected }) => {
      const result = checkPostalCode(country, code);
      expect(result).toEqual(expected);
    });
  });
});
