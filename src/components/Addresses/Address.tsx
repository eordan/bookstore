import React, { useEffect, useState, useContext } from 'react';
import { Button, Form, Col, Row, Container } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import toAlpha2 from 'iso-3166-1-alpha-2';
import { checkPostalCode } from '../../utils/validation';
import {
  changeAddress,
  removeAddress,
  setDefaultBillingAddress,
  setDefaultShippingAddress,
  updateCustomer,
} from '../../services/profileSetter';
import { Context } from '../../utils/createContext';

import './Addresses.scss';
import edit from '../../assets/edit.svg';
import del from '../../assets/delete.svg';

type AddressProps = {
  streetName: string;
  city: string;
  postalCode: string;
  country: string;
  id: string;
  isBilling: boolean;
  isShipping: boolean;
  loadData: () => void;
  notify: (message: string) => void;
};

export function Address({
  streetName,
  city,
  postalCode,
  country,
  id,
  isBilling,
  isShipping,
  loadData,
  notify,
}: AddressProps): JSX.Element {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    trigger,
  } = useForm({
    defaultValues: {
      street: streetName,
      city,
      postalCode,
      country: `${toAlpha2.getCountry(country)}`,
    },
    mode: 'onChange',
  });
  const [editMode, setEditMode] = useState<boolean>(false);
  const [isBillingDefault, setBillingDefault] = useState(isBilling);
  const [isShippingDefault, setShippingDefault] = useState(isShipping);
  const [color, setColor] = useState('');
  const { user } = useContext(Context);

  const changeColor = () => {
    if (isBillingDefault || isShippingDefault) {
      setColor('#07bc0c');
    } else {
      setColor('#dfdfdf');
    }
  };

  useEffect(() => changeColor());

  const turnOnEdit = () => {
    setEditMode(true);
  };

  const turnOffEdit = () => {
    setEditMode(false);
  };

  const deleteAddress = () => {
    updateCustomer(user.id, user.version, [removeAddress(id)]).then((data) => {
      if (data.version) {
        user.setVersion(data.version);
      }
      loadData();
      notify('Address successfuly removed!');
    });
  };

  const onSubmit = () => {
    const address = changeAddress(id, {
      streetName: getValues('street'),
      city: getValues('city'),
      postalCode: getValues('postalCode'),
      country: `${toAlpha2.getCode(getValues('country'))}`,
    });
    const billing = setDefaultBillingAddress(isBillingDefault ? id : undefined);
    const shipping = setDefaultShippingAddress(isShippingDefault ? id : undefined);
    updateCustomer(user.id, user.version, [address, billing, shipping]).then((data) => {
      if (data.version) {
        user.setVersion(data.version);
      }
      turnOffEdit();
      notify('Changes successfuly saved!');
    });
  };

  return (
    <Form
      className="m-3 d-flex flex-column form-block address"
      onSubmit={handleSubmit(onSubmit)}
      style={{ borderColor: color }}
    >
      <Container className="d-flex align-items-start mb-3 p-0">
        <Col>
          {isBillingDefault && !editMode && <p className="m-0 font-weight-500 address-status">Default billing</p>}
          {isShippingDefault && !editMode && <p className="m-0 font-weight-500 address-status">Default shipping</p>}
        </Col>
        {!editMode && (
          <Col className="d-flex justify-content-end">
            <button type="button" className="edit-btn" onClick={turnOnEdit}>
              <img src={edit} alt="edit" />
            </button>
            <button type="button" className="delete-btn" onClick={deleteAddress}>
              <img src={del} alt="delete" />
            </button>
          </Col>
        )}
      </Container>
      <Form.Group as={Row}>
        <Form.Label column sm={4}>
          Street
        </Form.Label>
        <Col sm={8}>
          <Form.Control
            disabled={!editMode}
            placeholder="Street"
            {...register('street', {
              validate: (value) => /^[a-zA-Z0-9]/.test(value) || 'Please enter correct street',
            })}
          />
          {editMode && <p className="message mt-1">{errors.street?.message}</p>}
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm={4}>
          City
        </Form.Label>
        <Col sm={8}>
          <Form.Control
            disabled={!editMode}
            placeholder="City"
            {...register('city', {
              validate: (value) => /^[a-zA-Z]/.test(value) || 'Please enter correct city',
            })}
          />
          {editMode && <p className="message mt-1">{errors.city?.message}</p>}
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm={4}>
          Postal code
        </Form.Label>
        <Col sm={8}>
          <Form.Control
            disabled={!editMode}
            placeholder="Postal code"
            {...register('postalCode', {
              validate: (value) => checkPostalCode(getValues('country'), value) || 'Please enter correct postal code',
            })}
          />
          {editMode && <p className="message mt-1">{errors.postalCode?.message}</p>}
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm={4}>
          Country
        </Form.Label>
        <Col sm={8}>
          <Form.Select
            disabled={!editMode}
            {...register('country', {
              validate: (value) => value !== 'Choose...' || 'Please choose country',
              onChange: () => {
                trigger('postalCode');
              },
            })}
          >
            <option>Choose...</option>
            <option>Canada</option>
            <option>United States</option>
          </Form.Select>
          {editMode && <p className="message mt-1">{errors.country?.message}</p>}
        </Col>
      </Form.Group>
      {editMode && (
        <Form.Check
          className="mt-2"
          type="switch"
          label="Default billing"
          checked={isBillingDefault}
          onChange={(e) => setBillingDefault(e.target.checked)}
        />
      )}
      {editMode && (
        <Form.Check
          className="mt-2"
          type="switch"
          label="Default shipping"
          checked={isShippingDefault}
          onChange={(e) => setShippingDefault(e.target.checked)}
        />
      )}
      {editMode && (
        <Container className="d-flex justify-content-between">
          <Button type="button" className="mt-3 me-3 col-5" variant="secondary" onClick={() => turnOffEdit()}>
            Cancel
          </Button>
          <Button type="submit" className="mt-3 col-5" variant="primary">
            Save changes
          </Button>
        </Container>
      )}
    </Form>
  );
}
