import React from 'react';
import { Container } from 'react-bootstrap';
import { Customer } from '@commercetools/platform-sdk';
import { Address } from './Address';

import 'react-toastify/dist/ReactToastify.css';
import './Addresses.scss';

export function Addresses(props: Customer): JSX.Element {
  return (
    <Container>
      {props.addresses.map((address) => (
        <Address
          key={address.id}
          streetName={address.streetName as string}
          city={address.city as string}
          postalCode={address.postalCode as string}
          country={address.country as string}
          id={address.id as string}
          isBilling={props.defaultBillingAddressId === address.id}
          isShipping={props.defaultShippingAddressId === address.id}
        />
      ))}
    </Container>
  );
}
