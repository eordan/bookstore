export const emailValidationRules = {
  required: 'Please enter your email',
  validate: {
    whitespacePattern: (value: string) => value === value.replace(' ', '') || 'No whitespaces',
    matchPattern: (value: string) => /^[\w_.+-]+@[\w.-]+\.[a-zA-Z]{2,4}/.test(value) || 'Please enter valid email',
  },
};

export const passwordValidationRules = {
  whitespacePattern: (value: string) => value === value.replace(' ', '') || 'No whitespaces',
  minLength: (value: string) => value.length >= 8 || 'Minimum 8 characters',
  uppercasePattern: (value: string) => /[A-Z]/.test(value) || 'At least 1 uppercase letter (A-Z)',
  lowercasePattern: (value: string) => /[a-z]/.test(value) || 'At least 1 lowercase letter (a-z)',
  digitPattern: (value: string) => /[0-9]/.test(value) || 'At least 1 digit (0-9)',
  specialPattern: (value: string) => /[!@#$%^&*?]/.test(value) || 'At least 1 special symbol (!@#$%^&*)',
};

export const checkBirthday = (date: string): boolean => {
  const today = new Date();
  const birthDate = new Date(date);
  const minAge = 13;
  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1;
  }
  if (age >= minAge) {
    return true;
  }
  return false;
};

export const checkPostalCode = (country: string, code: string): boolean => {
  const canadaPattern = /^[ABCEGHJ-NPRSTVXY][0-9][ABCEGHJ-NPRSTV-Z][ ]?[0-9][ABCEGHJ-NPRSTV-Z][0-9]$/;
  const usPattern = /(^\d{5}$)|(^\d{5}-\d{4}$)/;

  if (country === 'Choose...') {
    return true;
  }
  if (country === 'Canada' && canadaPattern.test(code)) {
    return true;
  }
  if (country === 'United States' && usPattern.test(code)) {
    return true;
  }
  return false;
};

export const namesValidationRules = {
  specialPattern: (value: string) => {
    if (/[!@#$%^&*?]/.test(value)) {
      return 'There should be no special characters';
    }
    return true;
  },
  alphabeticPattern: (value: string) => /^[a-zA-Z]/.test(value) || `Please enter correct name`,
  digitalPattern: (value: string) => {
    if (/[0-9]/.test(value)) {
      return 'There should be no numbers';
    }
    return true;
  },
};
