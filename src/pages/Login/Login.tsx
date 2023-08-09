import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { RoutesEnum } from '../../utils/enums';

import './Login.scss';

export function Login(): JSX.Element {
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center login-container">
      <h2 className="m-auto">Welcome Back</h2>
      <Form className="d-flex flex-column mt-4">
        <Form.Group className="mt-3">
          <Form.Label>Username</Form.Label>
          <Form.Control placeholder="Enter your username" />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control placeholder="Enter your password" type="password" />
        </Form.Group>
        <Button className="mt-3" variant="success">
          Get started
        </Button>
        <div className="d-flex justify-content-evenly mt-3">
          <p>Already have an account?</p>
          <NavLink className="sign-up pl-3" to={RoutesEnum.REGISTRATION_ROUTE}>
            Sign Up
          </NavLink>
        </div>
      </Form>
    </Container>
  );
}
