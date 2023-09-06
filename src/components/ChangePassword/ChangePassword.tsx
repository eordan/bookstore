import React, { useState, useContext } from 'react';
import { Button, Form, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast, Slide } from 'react-toastify';
import { passwordValidationRules } from '../../utils/validation';
import { Context } from '../../utils/createContext';

import 'react-toastify/dist/ReactToastify.css';
import './ChangePassword.scss';

import view from '../../assets/view.png';
import noView from '../../assets/no-view.png';
import { updateCustomerPassword } from '../../services/profileSetter';

export function ChangePassword(): JSX.Element {
  const {
    register,
    formState: { errors },
    handleSubmit,
    trigger,
    getValues,
  } = useForm({
    defaultValues: {
      password: '',
      newPassword: '',
      repeatNewPassword: '',
    },
    mode: 'onChange',
  });
  const [passwordType, setPasswordType] = useState('password');
  const [rePasswordType, setRePasswordType] = useState('password');
  const { user } = useContext(Context);

  const notify = () => {
    toast.success('Changes successfuly saved!', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
      transition: Slide,
      theme: 'colored',
    });
  };

  const showError = () => {
    toast.error('Wrong password', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
      transition: Slide,
      theme: 'colored',
    });
  };

  const togglePassword = () => {
    if (passwordType === 'password') {
      setPasswordType('text');
      return;
    }
    setPasswordType('password');
  };

  const toggleRePassword = () => {
    if (rePasswordType === 'password') {
      setRePasswordType('text');
      return;
    }
    setRePasswordType('password');
  };

  const onSubmit = async () => {
    const data = await updateCustomerPassword(user.id, user.version, getValues('password'), getValues('newPassword'));
    if (data.version) {
      user.setVersion(data.version);
      localStorage.setItem('userVersion', `${data.version}`);
      notify();
    } else {
      showError();
    }
  };

  return (
    <Form className="my-3 d-flex flex-column form-block" onSubmit={handleSubmit(onSubmit)}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="m-0">Change Password</h5>
      </div>
      <Form.Group as={Col} className="p-0">
        <Form.Label>Password *</Form.Label>
        <div className="password">
          <Form.Control
            className="password"
            placeholder="Enter your password"
            type={passwordType}
            {...register('password', {
              required: 'Please enter your password',
              validate: passwordValidationRules,
            })}
          />
          <button className="password-control" type="button" onClick={togglePassword}>
            {passwordType === 'password' ? <img src={view} alt="view" /> : <img src={noView} alt="no-view" />}
          </button>
        </div>
        <p className="message mt-2">{errors.password?.message}</p>
      </Form.Group>
      <Form.Group as={Col} className="p-0">
        <Form.Label>New Password *</Form.Label>
        <div className="password">
          <Form.Control
            className="password"
            placeholder="Enter new password"
            type={passwordType}
            {...register('newPassword', {
              required: 'Please enter your password',
              validate: passwordValidationRules,
              onChange: () => trigger('repeatNewPassword'),
            })}
          />
          <button className="password-control" type="button" onClick={togglePassword}>
            {passwordType === 'password' ? <img src={view} alt="view" /> : <img src={noView} alt="no-view" />}
          </button>
        </div>
        <p className="message mt-2">{errors.password?.message}</p>
      </Form.Group>
      <Form.Group as={Col} className="p-0">
        <Form.Label>New password *</Form.Label>
        <div className="password">
          <Form.Control
            className="password"
            placeholder="Repeate new password"
            type={rePasswordType}
            {...register('repeatNewPassword', {
              validate: (value) => value === getValues('newPassword') || 'Password does not match',
            })}
          />
          <button className="password-control" type="button" onClick={toggleRePassword}>
            {rePasswordType === 'password' ? <img src={view} alt="view" /> : <img src={noView} alt="no-view" />}
          </button>
        </div>
        <p className="message mt-2">{errors.repeatNewPassword?.message}</p>
      </Form.Group>
      <Button type="submit" className="mt-3 col-5 mx-auto" variant="primary">
        Save changes
      </Button>
      <ToastContainer />
    </Form>
  );
}
