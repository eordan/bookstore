import React, { useContext } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import toAlpha2 from 'iso-3166-1-alpha-2';
import { Context } from '../../utils/createContext';
import { checkPostalCode } from '../../utils/validation';
import { addAddress, updateCustomer } from '../../services/profileHandler/profileSetter';

import '../../pages/Profile/Profile.scss';
import '../../styles/main.scss';

type NewAddressProps = {
  addMode: (isAddMode: boolean) => void;
  notify: (message: string) => void;
  loadData: () => void;
};

export function NewAddress({ addMode, notify, loadData }: NewAddressProps): JSX.Element {
  const {
    register,
    getValues,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      street: '',
      city: '',
      postalCode: '',
      country: 'Choose...',
    },
    mode: 'onChange',
  });

  const { user } = useContext(Context);

  const onSubmit = () => {
    const address = addAddress({
      streetName: getValues('street'),
      city: getValues('city'),
      postalCode: getValues('postalCode'),
      country: `${toAlpha2.getCode(getValues('country'))}`,
    });

    updateCustomer(user.id, user.version, [address]).then((data) => {
      if (data.version) {
        user.setVersion(data.version);
        localStorage.setItem('userVersion', `${data.version}`);
      }
      notify('Changes successfuly saved!');
      loadData();
      addMode(false);
    });
  };

  return (
    <Form className="mx-3 mb-3 d-flex flex-column form-block" onSubmit={handleSubmit(onSubmit)}>
      <Form.Group>
        <Form.Label>Street *</Form.Label>
        <Form.Control
          placeholder="Street"
          {...register('street', {
            validate: (value) => /^[a-zA-Z0-9]/.test(value) || 'Please enter correct street',
          })}
        />
        <p className="message mt-2">{errors.street?.message}</p>
      </Form.Group>
      <Form.Group className="mt-2">
        <Form.Label>City *</Form.Label>
        <Form.Control
          placeholder="City"
          {...register('city', {
            validate: (value) => /^[a-zA-Z]/.test(value) || 'Please enter correct city',
          })}
        />
        <p className="message mt-2">{errors.city?.message}</p>
      </Form.Group>
      <Form.Group className="mt-2">
        <Form.Label>Postal code *</Form.Label>
        <Form.Control
          placeholder="Postal code"
          {...register('postalCode', {
            validate: (value) => checkPostalCode(getValues('country'), value) || 'Please enter correct postal code',
          })}
        />
        <p className="message mt-2">{errors.postalCode?.message}</p>
      </Form.Group>
      <Form.Group className="mt-2">
        <Form.Label>Country *</Form.Label>
        <Form.Select
          data-testid="shipping-country"
          {...register('country', {
            validate: (value) => value !== 'Choose...' || 'Please choose country',
            onChange: () => trigger('postalCode'),
          })}
        >
          <option>Choose...</option>
          <option>Canada</option>
          <option>United States</option>
        </Form.Select>
        <p className="message mt-2">{errors.country?.message}</p>
      </Form.Group>
      <Container className="d-flex justify-content-between">
        <Button type="button" className="mt-3 me-1 col-5 save-btn" variant="secondary" onClick={() => addMode(false)}>
          Cancel
        </Button>
        <Button type="submit" className="mt-3 col-5 save-btn" variant="primary">
          Save address
        </Button>
      </Container>
    </Form>
  );
}
