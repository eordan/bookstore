import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { RoutesEnum } from '../../utils/enums';

import './Reg.scss';

import view from '../../assets/view.png';
import noView from '../../assets/no-view.png';

export function Reg(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [firstName, setFirsName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [shippingCountry, setShippingCountry] = useState('');
  const [shippingStreet, setShippingStreet] = useState('');
  const [shippingCity, setShippingCity] = useState('');
  const [shippingPostalCode, setShippingPostalCode] = useState('');
  const [billingCountry, setBillingCountry] = useState('');
  const [billingStreet, setBillingStreet] = useState('');
  const [billingCity, setBillingCity] = useState('');
  const [billingPostalCode, setBillingPostalCode] = useState('');
  const [passwordType, setPasswordType] = useState('password');
  const [rePasswordType, setRePasswordType] = useState('password');

  const signUp = () => {
    // eslint-disable-next-line no-console
    console.log(
      'Function, that send data to api\n' +
        `${email}, ${password}, ${rePassword}, ${firstName}, ${lastName}, ${birthday}, ${shippingCountry}, ${shippingStreet}, ${shippingCity}, ${shippingPostalCode}, ${billingCountry}, ${billingStreet}, ${billingCity}, ${billingPostalCode}`,
    );
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

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center login-container">
      <h2>Sign up for free</h2>
      <Form className="d-flex flex-column mt-4 forms">
        <Row className="mt-3">
          <h5>Account</h5>
          <Form.Group as={Col}>
            <Form.Label>Email</Form.Label>
            <Form.Control placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Password</Form.Label>
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
          <Form.Group as={Col}>
            <Form.Label>Repeat password</Form.Label>
            <div className="password">
              <Form.Control
                className="password"
                placeholder="Repeate your password"
                type={rePasswordType}
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
              />
              <button className="password-control" type="button" onClick={toggleRePassword}>
                {rePasswordType === 'password' ? <img src={view} alt="view" /> : <img src={noView} alt="no-view" />}
              </button>
            </div>
          </Form.Group>
        </Row>
        <Row className="mt-4">
          <h5>Personal Info</h5>
          <Form.Group as={Col}>
            <Form.Label>First Name *</Form.Label>
            <Form.Control
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirsName(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Last Name *</Form.Label>
            <Form.Control
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Date of Birth *</Form.Label>
            <Form.Control type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
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
            <h5>Shipping address</h5>
            <Form.Group>
              <Form.Label>Street *</Form.Label>
              <Form.Control
                placeholder="Street"
                value={shippingStreet}
                onChange={(e) => setShippingStreet(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>City *</Form.Label>
              <Form.Control placeholder="City" value={shippingCity} onChange={(e) => setShippingCity(e.target.value)} />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Postal code *</Form.Label>
              <Form.Control
                placeholder="Postal code"
                value={shippingPostalCode}
                onChange={(e) => setShippingPostalCode(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Country *</Form.Label>
              <Form.Control
                placeholder="Country"
                value={shippingCountry}
                onChange={(e) => setShippingCountry(e.target.value)}
              />
            </Form.Group>
            <Form.Check className="mt-3" type="switch" id="custom-switch" label="Make this address default?" />
          </Col>
          <Col className="mt-3">
            <h5>Billing address</h5>
            <Form.Group>
              <Form.Label>Street *</Form.Label>
              <Form.Control
                placeholder="Street"
                value={billingStreet}
                onChange={(e) => setBillingStreet(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>City *</Form.Label>
              <Form.Control placeholder="City" value={billingCity} onChange={(e) => setBillingCity(e.target.value)} />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Postal code *</Form.Label>
              <Form.Control
                placeholder="Postal code"
                value={billingPostalCode}
                onChange={(e) => setBillingPostalCode(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Country *</Form.Label>
              <Form.Control
                placeholder="Country"
                value={billingCountry}
                onChange={(e) => setBillingCountry(e.target.value)}
              />
            </Form.Group>
            <Form.Check className="mt-3" type="switch" id="custom-switch" label="Make this address default?" />
          </Col>
        </Row>
        <Button className="mt-3" variant="success" onClick={signUp}>
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
