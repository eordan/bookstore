import React, { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast, Slide } from 'react-toastify';
import { namesValidationRules, checkBirthday, emailValidationRules } from '../../utils/validation';
import { Context } from '../../utils/createContext';

import 'react-toastify/dist/ReactToastify.css';
import './PersonalInfo.scss';
import edit from '../../assets/edit.svg';

export function PersonalInfo(): JSX.Element {
  const { user } = useContext(Context);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      firstName: `${user.firstName}`,
      lastName: `${user.lastName}`,
      birthday: `${user.dateOfBirth}`,
      email: `${user.email}`,
    },
    mode: 'onChange',
  });
  const [editMode, setEditMode] = useState<boolean>(false);
  const [showSaveBtn, setShowSaveBtn] = useState('none');

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

  const onSubmit = () => {
    turnOffEdit();
  };

  return (
    <Form className="my-3 d-flex flex-column form-block col-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="m-0">Personal Info</h5>
        <button type="button" className="edit-btn" onClick={turnOnEdit}>
          <img src={edit} alt="edit" />
        </button>
      </div>
      <Form.Group className="p-0">
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
      <Form.Group className="p-0">
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
      <Form.Group className="p-0">
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
      <Form.Group className="p-0">
        <Form.Label>Email</Form.Label>
        <Form.Control
          disabled={!editMode}
          placeholder="Enter your email"
          {...register('email', emailValidationRules)}
        />
        <p className="message mt-1">{errors.email?.message}</p>
      </Form.Group>
      <Button type="submit" className="mt-3 w-75" style={{ display: showSaveBtn }} variant="primary">
        Save changes
      </Button>
      <ToastContainer />
    </Form>
  );
}
