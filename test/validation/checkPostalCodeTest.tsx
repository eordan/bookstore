import { checkPostalCode } from '../../src/utils/validation';

describe('Check postal code validation', () => {
  it('returns if postal code is valid', () => {
    const testCases = [
      { country: 'Germany', code: '123456', expected: false },
      { country: 'Belarus', code: '00-000', expected: false },
      { country: 'Poland', code: '000000', expected: false },
      { country: 'Belarus', code: 'abcdef', expected: false },
      { country: 'Poland', code: '  -   ', expected: false },
      { country: 'Belarus', code: '224000', expected: true },
      { country: 'Poland', code: '12-123', expected: true },
    ];
    testCases.forEach(({ country, code, expected }) => {
      const result = checkPostalCode(country, code);
      expect(result).toEqual(expected);
    });
  });
});
