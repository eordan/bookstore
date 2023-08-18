import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { RoutesEnum } from '../../utils/enums';
import { loginCustomerThroughMe } from '../../services/customerAuther';

import './Login.scss';

import view from '../../assets/view.png';
import noView from '../../assets/no-view.png';

export function Login(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordType, setPasswordType] = useState('password');

  const signIn = async () => {
    const data = await loginCustomerThroughMe({ email, password });

    if (data.customer) {
      // eslint-disable-next-line no-console
      console.log('Customer successfully logged in');
    } else {
      // eslint-disable-next-line no-console
      console.log('Invalid login or password');
    }
  };

  const togglePassword = () => {
    if (passwordType === 'password') {
      setPasswordType('text');
      return;
    }
    setPasswordType('password');
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center login-container">
      <h2>Welcome Back</h2>
      <Form className="d-flex flex-column mt-4">
        <Form.Group className="mt-3">
          <Form.Label>Email *</Form.Label>
          <Form.Control placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label>Password *</Form.Label>
          <div className="password">
            <Form.Control
              className="password"
              placeholder="Enter your password"
              type={passwordType}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="password-control" type="button" onClick={togglePassword}>
              {passwordType === 'password' ? <img src={view} alt="view" /> : <img src={noView} alt="no-view" />}
            </button>
          </div>
        </Form.Group>
        <Button className="mt-3" variant="success" onClick={signIn}>
          Get started
        </Button>
        <div className="d-flex justify-content)-evenly mt-3 mb-5">
          <p>Already have an account?</p>
          <NavLink className="sign-up pl-3" to={RoutesEnum.REGISTRATION_ROUTE}>
            Sign Up
          </NavLink>
        </div>
      </Form>
    </Container>
  );
}
