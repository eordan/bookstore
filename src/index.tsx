import React from 'react';
import { createRoot } from 'react-dom/client';
// import { loginCustomer } from './services/customerAuther';
import toAlpha2 from 'iso-3166-1-alpha-2';
import { transformUserInputToCustomerDetails, createCustomer } from './services/customerCreator';
import { PROJECT_KEY } from './services/apiClientDetailsSetter';

import App from './components/App/index';
import './index.scss';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(<App />);
}

// const request = {
//   email: 'request@final.com',
//   password: 'tR6dZY32uR5UR52',
// };

// loginCustomer(request);

const firstCountryCode = toAlpha2.getCode('Germany') as string;
const secondCountryCode = toAlpha2.getCode('United States') as string;

const shippingAddress = {
  country: firstCountryCode,
  streetName: 'sgsfh',
  city: 'shsdh',
  postalCode: 'sdh',
};

const billingAddress = {
  country: secondCountryCode,
  streetName: 'nhgjyk',
  city: 'Nomjk',
  postalCode: 'hgyui',
};

const formattedDateOfBirth = new Date('2018-10-12').toISOString().split('T')[0];

const customerDraft = transformUserInputToCustomerDetails(
  'nbhkio@hjkiuo.com',
  'gygufiugliug',
  'Jhon',
  'Proper',
  formattedDateOfBirth,
  false,
  shippingAddress,
  true,
  billingAddress,
  true,
);

createCustomer(customerDraft, PROJECT_KEY);

// const data = checkEmailAndReturnInfo('request@final.com', PROJECT_KEY);
// console.log(data);
