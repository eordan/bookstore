export const emailValidationRules = {
  required: 'Please enter your email',
  validate: {
    matchPattern: (value: string) => /^[\w_.+-]+@[\w.-]+\.[a-zA-Z]{2,4}/.test(value) || 'Please enter valid email',
  },
};

export const passwordValidationRules = {
  required: 'Please enter your password',
  validate: {
    whitespacePattern: (value: string) => value === value.replace(' ', '') || 'No whitespaces',
    minLength: (value: string) => value.length >= 8 || 'Minimum 8 characters',
    uppercasePattern: (value: string) => /[A-Z]/.test(value) || 'At least 1 uppercase letter (A-Z)',
    lowercasePattern: (value: string) => /[a-z]/.test(value) || 'At least 1 lowercase letter (a-z)',
    digitPattern: (value: string) => /[0-9]/.test(value) || 'At least 1 digit (0-9)',
    specialPattern: (value: string) => /[!@#$%^&*?]/.test(value) || 'At least 1 special symbol (!@#$%^&*)',
  },
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
  console.log(age);
  if (age >= minAge) {
    return true;
  }
  return false;
}
