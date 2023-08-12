import React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { RoutesEnum } from '../../utils/enums';

import './Reg.scss';

export function Reg(): JSX.Element {
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center login-container">
      <h2>Sign up for free</h2>
      <Form className="d-flex flex-column mt-4 forms">
        <Row className="mt-3">
          <h5>Account</h5>
          <Form.Group as={Col}>
            <Form.Label>Email</Form.Label>
            <Form.Control placeholder="Enter your email" />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Password</Form.Label>
            <Form.Control placeholder="Enter your password" type="password" />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Repeat password</Form.Label>
            <Form.Control placeholder="Repeate your password" type="password" />
          </Form.Group>
        </Row>
        <Row className="mt-4">
          <h5>Personal Info</h5>
          <Form.Group as={Col}>
            <Form.Label>First Name *</Form.Label>
            <Form.Control placeholder="Enter your first name" />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Last Name *</Form.Label>
            <Form.Control placeholder="Enter your last name" />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Date of Birth *</Form.Label>
            <Form.Control type="date" />
          </Form.Group>
        </Row>
        <Form.Check
          className="mt-5"
          type="switch"
          id="custom-switch"
          label="Use the same address for shipping and billing"
        />
        <Row>
          <Col className="mt-3">
            <h5>Billing address</h5>
            <Form.Group>
              <Form.Label>Street *</Form.Label>
              <Form.Control placeholder="Street" />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>City *</Form.Label>
              <Form.Control placeholder="City" />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Postal code *</Form.Label>
              <Form.Control placeholder="Postal code" />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Country *</Form.Label>
              <Form.Control placeholder="Country" />
            </Form.Group>
            <Form.Check className="mt-3" type="switch" id="custom-switch" label="Make this address default?" />
          </Col>
          <Col className="mt-3">
            <h5>Shipping address</h5>
            <Form.Group>
              <Form.Label>Street *</Form.Label>
              <Form.Control placeholder="Street" />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>City *</Form.Label>
              <Form.Control placeholder="City" />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Postal code *</Form.Label>
              <Form.Control placeholder="Postal code" />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Country *</Form.Label>
              <Form.Control placeholder="Country" />
            </Form.Group>
            <Form.Check className="mt-3" type="switch" id="custom-switch" label="Make this address default?" />
          </Col>
        </Row>
        <Button className="mt-3" variant="success">
          Get started
        </Button>
        <Form.Text className="policy-text mt-3 text-muted">
          By filling in the form above and clicking the “Get Started” button, you accept and agree to Terms of Service
          and Privacy Policy.
        </Form.Text>
        <div className="d-flex justify-content-center mt-3">
          <p>Already have an account?</p>
          <NavLink className="sign-up" to={RoutesEnum.LOGIN_ROUTE}>
            Sign In
          </NavLink>
        </div>
      </Form>
    </Container>
  );
}
