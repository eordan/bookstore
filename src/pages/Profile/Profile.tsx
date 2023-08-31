import React, { useContext } from 'react';
import { Button, Container, Form, Nav } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { namesValidationRules, checkBirthday } from '../../utils/validation';
import { Context } from '../../utils/createContext';

export function Profile(): JSX.Element {
  const user = useContext(Context);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      firstName: `${user.firstName}`,
      lastName: `${user.lastName}`,
      birthday: `${user.dateOfBirth}`,
    },
    mode: 'onChange',
  });

  const onSubmit = () => console.log('send data to server...');

  return (
    <Container className="d-flex align-self-start">
      <Nav className="d-flex flex-column col-3 mt-3">
        <Nav.Link>Personal Info</Nav.Link>
        <Nav.Link>Addresses</Nav.Link>
      </Nav>
      <Form className="mt-3 d-flex flex-column" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="p-0">
          <Form.Label>First Name *</Form.Label>
          <Form.Control
            placeholder="Enter your first name"
            {...register('firstName', {
              required: 'Please enter your first name',
              validate: namesValidationRules,
            })}
          />
          <p className="message mt-1">{errors.firstName?.message}</p>
        </Form.Group>
        <Form.Group className="p-0">
          <Form.Label>Last Name *</Form.Label>
          <Form.Control
            placeholder="Enter your last name"
            {...register('lastName', {
              required: 'Please enter your last name',
              validate: namesValidationRules,
            })}
          />
          <p className="message mt-1">{errors.lastName?.message}</p>
        </Form.Group>
        <Form.Group className="p-0">
          <Form.Label>Date of Birth *</Form.Label>
          <Form.Control
            type="date"
            {...register('birthday', {
              validate: (value) => checkBirthday(value) || 'Minimum 13 years old',
            })}
          />
          <p className="message mt-1">{errors.birthday?.message}</p>
        </Form.Group>
        <Button type="submit" className="mt-3 w-75" variant="primary">
          Save changes
        </Button>
      </Form>
    </Container>
  );
}
