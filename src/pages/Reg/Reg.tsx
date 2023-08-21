import React, { useContext, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import ErrorMessage from '@components/ErrorMessage';
import { RoutesEnum } from '../../utils/enums';
import { getCustomerDetails, createCustomerThroughCustomers } from '../../services/customerCreator';
import { loginCustomerThroughMe } from '../../services/customerAuther';
import { checkBirthday, checkPostalCode, emailValidationRules, passwordValidationRules } from '../../utils/validation';
import { Context } from '../..';

import './Reg.scss';

import view from '../../assets/view.png';
import noView from '../../assets/no-view.png';

export function Reg(): JSX.Element {
  const [shippingCountry, setShippingCountry] = useState('');
  const [billingCountry, setBillingCountry] = useState('');
  const [isIdentical, setIdentical] = useState(false);
  const [isBillingDefault, setBillingDefault] = useState(false);
  const [isShippingDefault, setShippingDefault] = useState(false);
  const [passwordType, setPasswordType] = useState('password');
  const [rePasswordType, setRePasswordType] = useState('password');
  const [isErrorShowing, setIsErrorShowing] = useState<boolean>(false);
  const {
    register,
    getValues,
    setValue,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      passwordRepeat: '',
      firstName: '',
      lastName: '',
      birthday: '',
      shippingStreet: '',
      shippingCity: '',
      shippingPostalCode: '',
      billingStreet: '',
      billingCity: '',
      billingPostalCode: '',
    },
    mode: 'onChange',
  });

  const user = useContext(Context);
  const navigate = useNavigate();

  const signUp = async () => {
    const email = getValues('email');
    const password = getValues('password');

    const customerDetails = getCustomerDetails(
      getValues('email'),
      getValues('password'),
      getValues('firstName'),
      getValues('lastName'),
      getValues('birthday'),
      isIdentical,
      shippingCountry,
      getValues('shippingStreet'),
      getValues('shippingPostalCode'),
      getValues('shippingCity'),
      isShippingDefault,
      billingCountry,
      getValues('billingStreet'),
      getValues('billingPostalCode'),
      getValues('billingCity'),
      isBillingDefault,
    );
    console.log(customerDetails);

    const data = await createCustomerThroughCustomers(customerDetails)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });

    if (data.customer) {
      const signInData = await loginCustomerThroughMe({ email, password });

      if (signInData.customer) {
        user.setIsAuth(true);
        navigate(RoutesEnum.MAIN_ROUTE);
      }
    } else {
      setIsErrorShowing(true);
    }
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

  const onSubmit = () => signUp();

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center login-container">
      {user.isAuth && <Navigate to={RoutesEnum.MAIN_ROUTE} />}
      <h2>Sign up for free</h2>
      {isErrorShowing && <ErrorMessage handle={setIsErrorShowing} message="Email has already registered" />}
      <Form className="d-flex flex-column mt-4 forms" onSubmit={handleSubmit(onSubmit)}>
        <Row className="mt-3">
          <h5>Account</h5>
          <Form.Group as={Col}>
            <Form.Label>Email</Form.Label>
            <Form.Control placeholder="Enter your email" {...register('email', emailValidationRules)} />
            <p className="message">{errors.email?.message}</p>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Password</Form.Label>
            <div className="password">
              <Form.Control
                className="password"
                placeholder="Enter your password"
                type={passwordType}
                {...register('password', {
                  required: 'Please enter your password',
                  validate: passwordValidationRules,
                  onChange: () => trigger('passwordRepeat'),
                })}
              />
              <p className="message">{errors.password?.message}</p>
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
                {...register('passwordRepeat', {
                  validate: (value) => value === getValues('password') || 'Password does not match',
                })}
              />
              <p className="message">{errors.passwordRepeat?.message}</p>
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
              {...register('firstName', {
                validate: (value) => /[a-zA-Z]/.test(value) || 'Please enter correct name',
              })}
            />
            <p className="message">{errors.firstName?.message}</p>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Last Name *</Form.Label>
            <Form.Control
              placeholder="Enter your last name"
              {...register('lastName', {
                validate: (value) => /[a-zA-Z]/.test(value) || 'Please enter correct last name',
              })}
            />
            <p className="message">{errors.lastName?.message}</p>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Date of Birth *</Form.Label>
            <Form.Control
              type="date"
              {...register('birthday', {
                validate: (value) => checkBirthday(value) || 'Minimum 13 years old',
              })}
            />
            <p className="message">{errors.birthday?.message}</p>
          </Form.Group>
        </Row>
        <Form.Check
          className="mt-5"
          type="switch"
          id="custom-switch"
          label="Use the same address for shipping and billing"
          checked={isIdentical}
          onChange={(e) => {
            setIdentical(e.target.checked);
            setValue('billingStreet', getValues('shippingStreet'));
            setValue('billingCity', getValues('shippingCity'));
            setValue('billingPostalCode', getValues('shippingPostalCode'));
            setBillingCountry(shippingCountry);
            trigger(['billingStreet', 'billingCity', 'billingPostalCode']);
          }}
        />
        <Row>
          <Col className="mt-3">
            <h5>Shipping address</h5>
            <Form.Group>
              <Form.Label>Street *</Form.Label>
              <Form.Control
                placeholder="Street"
                {...register('shippingStreet', {
                  validate: (value) => /[a-zA-Z0-9]/.test(value) || 'Please enter correct street',
                  onChange: (e) => {
                    if (isIdentical) {
                      setValue('billingStreet', getValues(e.target.name));
                      trigger('billingStreet');
                    }
                  },
                })}
              />
              <p className="message">{errors.shippingStreet?.message}</p>
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>City *</Form.Label>
              <Form.Control
                placeholder="City"
                {...register('shippingCity', {
                  validate: (value) => /[a-zA-Z]/.test(value) || 'Please enter correct city',
                  onChange: (e) => {
                    if (isIdentical) {
                      setValue('billingCity', getValues(e.target.name));
                      trigger('billingCity');
                    }
                  },
                })}
              />
              <p className="message">{errors.shippingCity?.message}</p>
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Postal code *</Form.Label>
              <Form.Control
                placeholder="Postal code"
                {...register('shippingPostalCode', {
                  validate: (value) => checkPostalCode(shippingCountry, value) || 'Please enter correct postal code',
                  onChange: (e) => {
                    if (isIdentical) {
                      setValue('billingPostalCode', getValues(e.target.name));
                      trigger('billingPostalCode');
                    }
                  },
                })}
              />
              <p className="message">{errors.shippingPostalCode?.message}</p>
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Country *</Form.Label>
              <Form.Control
                placeholder="Country"
                value={shippingCountry}
                onChange={(e) => {
                  setShippingCountry(e.target.value);
                  if (isIdentical) setBillingCountry(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Check
              checked={isShippingDefault}
              className="mt-3"
              type="switch"
              id="custom-switch"
              label="Make this address default?"
              onChange={(e) => setShippingDefault(e.target.checked)}
            />
          </Col>
          <Col className="mt-3">
            <h5>Billing address</h5>
            <Form.Group>
              <Form.Label>Street *</Form.Label>
              <Form.Control
                placeholder="Street"
                disabled={isIdentical}
                {...register('billingStreet', {
                  validate: (value) => /[a-zA-Z0-9]/.test(value) || 'Please enter correct street',
                })}
              />
              <p className="message">{errors.billingStreet?.message}</p>
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>City *</Form.Label>
              <Form.Control
                placeholder="City"
                disabled={isIdentical}
                {...register('billingCity', {
                  validate: (value) => /[a-zA-Z]/.test(value) || 'Please enter correct city',
                })}
              />
              <p className="message">{errors.billingCity?.message}</p>
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Postal code *</Form.Label>
              <Form.Control
                placeholder="Postal code"
                disabled={isIdentical}
                {...register('billingPostalCode', {
                  validate: (value) => checkPostalCode(billingCountry, value) || 'Please enter correct postal code',
                })}
              />
              <p className="message">{errors.billingPostalCode?.message}</p>
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Country *</Form.Label>
              <Form.Control
                placeholder="Country"
                disabled={isIdentical}
                value={billingCountry}
                onChange={(e) => setBillingCountry(e.target.value)}
              />
            </Form.Group>
            <Form.Check
              className="mt-3"
              type="switch"
              id="custom-switch"
              label="Make this address default?"
              checked={isBillingDefault}
              onChange={(e) => setBillingDefault(e.target.checked)}
            />
          </Col>
        </Row>
        <Button type="submit" className="mt-3" variant="success">
          Get started
        </Button>
        <Form.Text className="policy-text mt-3 text-muted">
          By filling in the form above and clicking the “Get Started” button, you accept and agree to Terms of Service
          and Privacy Policy.
        </Form.Text>
        <div className="d-flex justify-content-center mt-3 mb-5">
          <p>Already have an account?</p>
          <NavLink className="sign-up" to={RoutesEnum.LOGIN_ROUTE}>
            Sign In
          </NavLink>
        </div>
      </Form>
    </Container>
  );
}
