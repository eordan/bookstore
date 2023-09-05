import React, { useState, useContext } from 'react';
import { Button, Form, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast, Slide } from 'react-toastify';
import { Customer } from '@commercetools/platform-sdk';
import { namesValidationRules, checkBirthday, emailValidationRules } from '../../utils/validation';
import { Context } from '../../utils/createContext';
import { changeEmail, setDateOfBirth, setFirstName, setLastName, updateCustomer } from '../../services/profileSetter';

import 'react-toastify/dist/ReactToastify.css';
import './PersonalInfo.scss';
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
  const [showSaveBtn, setShowSaveBtn] = useState('none');
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
    setShowSaveBtn('block');
  };

  const turnOffEdit = () => {
    setEditMode(false);
    setShowSaveBtn('none');
    notify();
  };

  const onSubmit = async () => {
    await updateCustomer(user.id, user.version, [
      setFirstName(getValues('firstName')),
      setLastName(getValues('lastName')),
      setDateOfBirth(getValues('birthday')),
      changeEmail(getValues('email')),
    ]);
    turnOffEdit();
  };

  return (
    <Form className="my-3 d-flex flex-column form-block" onSubmit={handleSubmit(onSubmit)}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="m-0">Personal Info</h5>
        <button type="button" className="edit-btn" onClick={turnOnEdit}>
          <img src={edit} alt="edit" />
        </button>
      </div>
      <Form.Group as={Col} className="p-0">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          disabled={!editMode}
          placeholder="Enter your first name"
          {...register('firstName', {
            required: 'Please enter your first name',
            validate: namesValidationRules,
          })}
        />
        <p className="message mt-1">{errors.firstName?.message}</p>
      </Form.Group>
      <Form.Group as={Col} className="p-0">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          disabled={!editMode}
          placeholder="Enter your last name"
          {...register('lastName', {
            required: 'Please enter your last name',
            validate: namesValidationRules,
          })}
        />
        <p className="message mt-1">{errors.lastName?.message}</p>
      </Form.Group>
      <Form.Group as={Col} className="p-0">
        <Form.Label>Date of Birth</Form.Label>
        <Form.Control
          disabled={!editMode}
          type="date"
          {...register('birthday', {
            validate: (value) => checkBirthday(value) || 'Minimum 13 years old',
          })}
        />
        <p className="message mt-1">{errors.birthday?.message}</p>
      </Form.Group>
      <Form.Group as={Col} className="p-0">
        <Form.Label>Email</Form.Label>
        <Form.Control
          disabled={!editMode}
          placeholder="Enter your email"
          {...register('email', emailValidationRules)}
        />
        <p className="message mt-1">{errors.email?.message}</p>
      </Form.Group>
      <Button type="submit" className="mt-3 save-btn" style={{ display: showSaveBtn }} variant="primary">
        Save changes
      </Button>
      <ToastContainer />
    </Form>
  );
}
