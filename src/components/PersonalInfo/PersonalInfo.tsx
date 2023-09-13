import React, { useState, useContext } from 'react';
import { Button, Form, Col, Container, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast, Slide } from 'react-toastify';
import { Customer } from '@commercetools/platform-sdk';
import { namesValidationRules, checkBirthday, emailValidationRules } from '../../utils/validation';
import { Context } from '../../utils/createContext';
import {
  changeEmail,
  setDateOfBirth,
  setFirstName,
  setLastName,
  updateCustomer,
} from '../../services/profileHandler/profileSetter';

import 'react-toastify/dist/ReactToastify.css';
import '../../pages/Profile/Profile.scss';
import '../../styles/main.scss';
import edit from '../../assets/edit.svg';

export function PersonalInfo(props: Customer): JSX.Element {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm({
    defaultValues: {
      firstName: `${props.firstName}`,
      lastName: `${props.lastName}`,
      birthday: `${props.dateOfBirth}`,
      email: `${props.email}`,
    },
    mode: 'onChange',
  });
  const [editMode, setEditMode] = useState<boolean>(false);
  const { user } = useContext(Context);

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
  };

  const onSubmit = () => {
    updateCustomer(user.id, user.version, [
      setFirstName(getValues('firstName')),
      setLastName(getValues('lastName')),
      setDateOfBirth(getValues('birthday')),
      changeEmail(getValues('email')),
    ]).then((data) => {
      if (data.version) {
        user.setVersion(data.version);
        localStorage.setItem('userVersion', `${data.version}`);
      }
      turnOffEdit();
      notify();
    });
  };

  return (
    <Form className="my-3 d-flex flex-column form-block personal-info" onSubmit={handleSubmit(onSubmit)}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="m-0">Personal Info</h5>
        {!editMode && (
          <Button type="button" className="edit-btn" onClick={turnOnEdit}>
            <img src={edit} alt="edit" />
          </Button>
        )}
      </div>
      <Form.Group as={Row} className="p-0">
        <Form.Label column sm={4}>
          First Name
        </Form.Label>
        <Col sm={8}>
          <Form.Control
            className="profile"
            disabled={!editMode}
            placeholder="Enter your first name"
            {...register('firstName', {
              required: 'Please enter your first name',
              validate: namesValidationRules,
            })}
          />
          {editMode && <p className="message mt-1">{errors.firstName?.message}</p>}
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="p-0">
        <Form.Label column sm={4}>
          Last Name
        </Form.Label>
        <Col sm={8}>
          <Form.Control
            className="profile"
            disabled={!editMode}
            placeholder="Enter your last name"
            {...register('lastName', {
              required: 'Please enter your last name',
              validate: namesValidationRules,
            })}
          />
          {editMode && <p className="message mt-1">{errors.lastName?.message}</p>}
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="p-0">
        <Form.Label column sm={4}>
          Date of Birth
        </Form.Label>
        <Col sm={8}>
          <Form.Control
            className="profile"
            disabled={!editMode}
            type="date"
            {...register('birthday', {
              validate: (value) => checkBirthday(value) || 'Minimum 13 years old',
            })}
          />
          {editMode && <p className="message mt-1">{errors.birthday?.message}</p>}
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="p-0">
        <Form.Label column sm={4}>
          Email
        </Form.Label>
        <Col sm={8}>
          <Form.Control
            className="profile"
            disabled={!editMode}
            placeholder="Enter your email"
            {...register('email', emailValidationRules)}
          />
          {editMode && <p className="message mt-1">{errors.email?.message}</p>}
        </Col>
      </Form.Group>
      {editMode && (
        <Container className="d-flex justify-content-between">
          <Button type="button" className="mt-3 me-1 save-btn col-5" variant="secondary" onClick={() => turnOffEdit()}>
            Cancel
          </Button>
          <Button type="submit" className="mt-3 save-btn col-5" variant="primary">
            Save changes
          </Button>
        </Container>
      )}
      <ToastContainer />
    </Form>
  );
}
