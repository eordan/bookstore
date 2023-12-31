import React, { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { ToastContainer, toast, Slide } from 'react-toastify';
import { Customer } from '@commercetools/platform-sdk';
import { Address } from './Address';
import { NewAddress } from './NewAddress';

import 'react-toastify/dist/ReactToastify.css';
import '../../styles/main.scss';
import '../../pages/Profile/Profile.scss';

type AddressesProps = {
  userData: Customer;
  loadData: () => void;
};

export function Addresses({ userData, loadData }: AddressesProps): JSX.Element {
  const [isAddMode, setAddMode] = useState(false);
  const [billingId, setBillingId] = useState<string | undefined>();
  const [shippingId, setShippingId] = useState<string | undefined>();

  useEffect(() => {
    setBillingId(userData.defaultBillingAddressId);
    setShippingId(userData.defaultShippingAddressId);
  });

  const turnOnAddMode = () => {
    setAddMode(true);
  };

  const notify = (message: string) => {
    toast.success(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
      transition: Slide,
      theme: 'colored',
    });
  };

  return (
    <Container className="my-3">
      <div>
        {!isAddMode && (
          <Button variant="success" className="ms-3" onClick={() => turnOnAddMode()}>
            Add address
          </Button>
        )}
      </div>
      <div className="addresses">
        {!isAddMode &&
          userData.addresses.map((address) => (
            <Address
              key={address.id}
              streetName={address.streetName as string}
              city={address.city as string}
              postalCode={address.postalCode as string}
              country={address.country as string}
              id={address.id as string}
              isBilling={userData.defaultBillingAddressId === address.id}
              isShipping={userData.defaultShippingAddressId === address.id}
              billingId={billingId as string}
              shippingId={shippingId as string}
              loadData={loadData}
              notify={notify}
            />
          ))}
      </div>
      {isAddMode && <NewAddress addMode={setAddMode} notify={notify} loadData={loadData} />}
      <ToastContainer />
    </Container>
  );
}
