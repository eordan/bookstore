import React, { useContext, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast, Slide } from 'react-toastify';
import { RoutesEnum } from '../../utils/enums';
import { loginCustomer } from '../../services/customerAuther';
import { emailValidationRules, passwordValidationRules } from '../../utils/validation';
import { Context } from '../../utils/createContext';

import 'react-toastify/dist/ReactToastify.css';
import './Login.scss';

import view from '../../assets/view.png';
import noView from '../../assets/no-view.png';

export function Login(): JSX.Element {
  const [passwordType, setPasswordType] = useState('password');
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const notify = () => {
    toast.error('Invalid email or password', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
      transition: Slide,
      theme: 'colored',
    });
  };

  const signIn = async () => {
    const email = getValues('email');
    const password = getValues('password');
    const data = await loginCustomer({ email, password });

    if (data.customer) {
      user.setIsAuth(true);
      user.setIsEntered(true);
      user.setFirstName(data.customer.firstName as string);
      user.setLastName(data.customer.lastName as string);
      user.setDateOfBirth(data.customer.dateOfBirth as string);
      user.setEmail(data.customer.email as string);
      navigate(RoutesEnum.MAIN_ROUTE);
    } else {
      notify();
    }
  };

  const togglePassword = () => {
    if (passwordType === 'password') {
      setPasswordType('text');
      return;
    }
    setPasswordType('password');
  };

  const onSubmit = () => signIn();

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center login-container">
      {user.isAuth && <Navigate to={RoutesEnum.MAIN_ROUTE} />}
      <h2>Welcome Back</h2>
      <ToastContainer />
      <Form className="d-flex flex-column mt-4" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mt-3">
          <Form.Label>Email *</Form.Label>
          <Form.Control placeholder="Enter your email" {...register('email', emailValidationRules)} />
          <p className="message mt-2">{errors.email?.message}</p>
        </Form.Group>
        <Form.Group className="mt-2">
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
        <Button type="submit" className="mt-3" variant="success">
          Get started
        </Button>
        <div className="d-flex align-self-center mt-3 mb-5">
          <p>Don&apos;t have an account?</p>
          <NavLink className="sign-up" to={RoutesEnum.REGISTRATION_ROUTE}>
            Sign Up
          </NavLink>
        </div>
      </Form>
    </Container>
  );
}
