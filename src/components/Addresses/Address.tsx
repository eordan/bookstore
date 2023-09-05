import React, { useEffect, useState } from 'react';
import { Button, Form, Col, Row, Container } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast, Slide } from 'react-toastify';
import { checkPostalCode } from '../../utils/validation';

import 'react-toastify/dist/ReactToastify.css';
import './Addresses.scss';
import edit from '../../assets/edit.svg';
import del from '../../assets/delete.svg';

type AddressInfo = {
  streetName: string;
  city: string;
  postalCode: string;
  country: string;
  id: string;
  isBilling: boolean;
  isShipping: boolean;
};

export function Address({
  streetName,
  city,
  postalCode,
  country,
  id,
  isBilling,
  isShipping,
}: AddressInfo): JSX.Element {
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
      country: `${country === 'US' ? 'United States' : 'Canada'}`,
    },
    mode: 'onChange',
  });
  const [editMode, setEditMode] = useState<boolean>(false);
  const [isBillingDefault, setBillingDefault] = useState(isBilling);
  const [isShippingDefault, setShippingDefault] = useState(isShipping);
  const [color, setColor] = useState('');

  const changeColor = () => {
    if (isBillingDefault || isShippingDefault) {
      setColor('#38c50021');
    } else {
      setColor('transparent');
    }
  };

  useEffect(() => changeColor());

  const notify = () => {
    toast.success('Changes successfuly saved!', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
      transition: Slide,
      theme: 'colored',
    });
  };

  const turnOnEdit = () => {
    setEditMode(true);
  };

  const turnOffEdit = () => {
    setEditMode(false);
    notify();
  };

  const onSubmit = async () => {
    console.log(id);

    turnOffEdit();
  };

  return (
    <Form className="m-3 d-flex flex-column form-block" onSubmit={handleSubmit(onSubmit)} style={{ background: color }}>
      <Container className="d-flex justify-content-between align-items-start mb-3 p-0">
        <Col>
          {isBillingDefault && !editMode && <p className="m-0 font-weight-500 address-status">Default billing</p>}
          {isShippingDefault && !editMode && <p className="m-0 font-weight-500 address-status">Default shipping</p>}
        </Col>
        <Col className="d-flex justify-content-end">
          <button type="button" className="edit-btn" onClick={turnOnEdit} disabled={editMode}>
            <img src={edit} alt="edit" />
          </button>
          <button type="button" className="delete-btn" onClick={turnOnEdit}>
            <img src={del} alt="delete" />
          </button>
        </Col>
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
      <Form.Group as={Row} className="mt-2">
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
      <Form.Group as={Row} className="mt-2">
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
      <Form.Group as={Row} className="mt-2">
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
        <Button type="submit" className="mt-3 save-btn" variant="primary">
          Save changes
        </Button>
      )}
      <ToastContainer />
    </Form>
  );
}
