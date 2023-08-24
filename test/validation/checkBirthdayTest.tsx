import { checkBirthday } from '../../src/utils/validation';

jest.useFakeTimers().setSystemTime(new Date('2024-08-23'));

describe('Check birthday validation', () => {
  it('should return true if age more than 13', () => {
    const result = checkBirthday('2011-08-22');
    const expected = true;
    expect(result).toEqual(expected);
  });
  it('should return false if age less than 13', () => {
    const result = checkBirthday('2023-08-23');
    const expected = false;
    expect(result).toEqual(expected);
  });
});
