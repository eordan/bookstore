export const emailValidationRules = {
  required: 'Please enter your email',
  validate: {
    matchPattern: (value: string) =>
      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value) || 'Please enter valid email',
  },
};

export const passwordValidationRules = {
  required: 'Please enter your password',
  validate: {
    minLength: (value: string) => value.length >= 8 || 'Minimum 8 characters',
    uppercasePattern: (value: string) => /[A-Z]/.test(value) || 'At least 1 uppercase letter (A-Z)',
    lowercasePattern: (value: string) => /[a-z]/.test(value) || 'At least 1 lowercase letter (a-z)',
    digitPattern: (value: string) => /[0-9]/.test(value) || 'At least 1 digit (0-9)',
    specialPattern: (value: string) => /[!@#$%^&*?]/.test(value) || 'At least 1 special symbol (!@#$%^&*)',
    whitespacePattern: (value: string) => value === value.trim() || 'No leading or trailing whitespace',
  },
};