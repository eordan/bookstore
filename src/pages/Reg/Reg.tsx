import React, { useContext, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast, Slide } from 'react-toastify';
import { RoutesEnum } from '../../utils/enums';
import { getCustomerDetails, createCustomer } from '../../services/customerCreator';
import { loginCustomer } from '../../services/customerAuther';
import { Context } from '../../utils/createContext';
import {
  checkBirthday,
  checkPostalCode,
  emailValidationRules,
  namesValidationRules,
  passwordValidationRules,
} from '../../utils/validation';

import 'react-toastify/dist/ReactToastify.css';
import './Reg.scss';

import view from '../../assets/view.png';
import noView from '../../assets/no-view.png';

export function Reg(): JSX.Element {
  const [isIdentical, setIdentical] = useState(false);
  const [isBillingDefault, setBillingDefault] = useState(false);
  const [isShippingDefault, setShippingDefault] = useState(false);
  const [passwordType, setPasswordType] = useState('password');
  const [rePasswordType, setRePasswordType] = useState('password');
  const {
    register,
    getValues,
    setValue,
    trigger,
    clearErrors,
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
      shippingCountry: 'Choose...',
      billingStreet: '',
      billingCity: '',
      billingPostalCode: '',
      billingCountry: 'Choose...',
    },
    mode: 'onChange',
  });

  const { user } = useContext(Context);
  const navigate = useNavigate();

  const notify = () => {
    toast.error('Email is already registered', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
      transition: Slide,
      theme: 'colored',
    });
  };

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
      getValues('shippingCountry'),
      getValues('shippingStreet'),
      getValues('shippingPostalCode'),
      getValues('shippingCity'),
      isShippingDefault,
      getValues('billingCountry'),
      getValues('billingStreet'),
      getValues('billingPostalCode'),
      getValues('billingCity'),
      isBillingDefault,
    );

    const data = await createCustomer(customerDetails)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });

    if (data.customer) {
      const signInData = await loginCustomer({ email, password });

      if (signInData.customer) {
        user.setIsAuth(true);
        user.setIsEntered(true);
        navigate(RoutesEnum.MAIN_ROUTE);
      }
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

  const toggleRePassword = () => {
    if (rePasswordType === 'password') {
      setRePasswordType('text');
      return;
    }
    setRePasswordType('password');
  };

  const onSubmit = () => signUp();

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center login-container mt-4">
      {user.isAuth && <Navigate to={RoutesEnum.MAIN_ROUTE} />}
      <h2>Sign up for free</h2>
      <ToastContainer />
      <Form className="d-flex flex-column forms" onSubmit={handleSubmit(onSubmit)}>
        <Row className="mt-3 form-block">
          <h5>Account</h5>
          <Form.Group as={Col}>
            <Form.Label>Email</Form.Label>
            <Form.Control placeholder="Enter your email" {...register('email', emailValidationRules)} />
            <p className="message mt-2">{errors.email?.message}</p>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Password *</Form.Label>
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
              <button className="password-control" type="button" onClick={togglePassword}>
                {passwordType === 'password' ? <img src={view} alt="view" /> : <img src={noView} alt="no-view" />}
              </button>
            </div>
            <p className="message mt-2">{errors.password?.message}</p>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Repeat password *</Form.Label>
            <div className="password">
              <Form.Control
                className="password"
                placeholder="Repeate your password"
                type={rePasswordType}
                {...register('passwordRepeat', {
                  validate: (value) => value === getValues('password') || 'Password does not match',
                })}
              />
              <button className="password-control" type="button" onClick={toggleRePassword}>
                {rePasswordType === 'password' ? <img src={view} alt="view" /> : <img src={noView} alt="no-view" />}
              </button>
            </div>
            <p className="message mt-2">{errors.passwordRepeat?.message}</p>
          </Form.Group>
        </Row>
        <Row className="mt-3 form-block">
          <h5>Personal Info</h5>
          <Form.Group as={Col}>
            <Form.Label>First Name *</Form.Label>
            <Form.Control
              placeholder="Enter your first name"
              {...register('firstName', {
                required: 'Please enter your first name',
                validate: namesValidationRules,
              })}
            />
            <p className="message mt-2">{errors.firstName?.message}</p>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Last Name *</Form.Label>
            <Form.Control
              placeholder="Enter your last name"
              {...register('lastName', {
                required: 'Please enter your last name',
                validate: namesValidationRules,
              })}
            />
            <p className="message mt-2">{errors.lastName?.message}</p>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Date of Birth *</Form.Label>
            <Form.Control
              type="date"
              {...register('birthday', {
                validate: (value) => checkBirthday(value) || 'Minimum 13 years old',
              })}
            />
            <p className="message mt-2">{errors.birthday?.message}</p>
          </Form.Group>
        </Row>
        <Form.Check
          className="mt-4"
          type="switch"
          data-testid="identical-toggle"
          label="Use the same address for shipping and billing"
          checked={isIdentical}
          onChange={(e) => {
            setIdentical(e.target.checked);
            if (!isIdentical) {
              clearErrors(['billingStreet', 'billingCity', 'billingPostalCode', 'billingCountry']);
            } else {
              trigger(['billingStreet', 'billingCity', 'billingPostalCode', 'billingCountry']);
            }
            setValue('billingStreet', getValues('shippingStreet'));
            setValue('billingCity', getValues('shippingCity'));
            setValue('billingPostalCode', getValues('shippingPostalCode'));
            setValue('billingCountry', getValues('shippingCountry'));
          }}
        />
        <Row className="address">
          <Col className="mt-3 form-block">
            <h5>Shipping address</h5>
            <Form.Group>
              <Form.Label>Street *</Form.Label>
              <Form.Control
                placeholder="Street"
                {...register('shippingStreet', {
                  validate: (value) => /^[a-zA-Z0-9]/.test(value) || 'Please enter correct street',
                  onChange: (e) => {
                    if (isIdentical) {
                      setValue('billingStreet', getValues(e.target.name));
                      trigger('billingStreet');
                    }
                  },
                })}
              />
              <p className="message mt-2">{errors.shippingStreet?.message}</p>
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>City *</Form.Label>
              <Form.Control
                placeholder="City"
                {...register('shippingCity', {
                  validate: (value) => /^[a-zA-Z]/.test(value) || 'Please enter correct city',
                  onChange: (e) => {
                    if (isIdentical) {
                      setValue('billingCity', getValues(e.target.name));
                      trigger('billingCity');
                    }
                  },
                })}
              />
              <p className="message mt-2">{errors.shippingCity?.message}</p>
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>Postal code *</Form.Label>
              <Form.Control
                placeholder="Postal code"
                data-testid="shipping-postal-code"
                {...register('shippingPostalCode', {
                  validate: (value) =>
                    checkPostalCode(getValues('shippingCountry'), value) || 'Please enter correct postal code',
                  onChange: (e) => {
                    if (isIdentical) {
                      setValue('billingPostalCode', getValues(e.target.name));
                      trigger('billingPostalCode');
                    }
                  },
                })}
              />
              <p className="message mt-2">{errors.shippingPostalCode?.message}</p>
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>Country *</Form.Label>
              <Form.Select
                data-testid="shipping-country"
                {...register('shippingCountry', {
                  validate: (value) => value !== 'Choose...' || 'Please choose country',
                  onChange: (e) => {
                    trigger('shippingPostalCode');
                    if (isIdentical) {
                      setValue('billingCountry', getValues(e.target.name));
                      trigger('billingPostalCode');
                    }
                  },
                })}
              >
                <option>Choose...</option>
                <option>Canada</option>
                <option>United States</option>
              </Form.Select>
              <p className="message mt-2">{errors.shippingCountry?.message}</p>
            </Form.Group>
            <Form.Check
              checked={isShippingDefault}
              className="mt-2"
              data-testid="default-shipping"
              type="switch"
              label="Make this address default?"
              onChange={(e) => setShippingDefault(e.target.checked)}
            />
          </Col>
          <Col className="mt-3 form-block">
            <h5>Billing address</h5>
            <Form.Group>
              <Form.Label>Street *</Form.Label>
              <Form.Control
                placeholder="Street"
                disabled={isIdentical}
                {...register('billingStreet', {
                  validate: (value) => /^[a-zA-Z0-9]/.test(value) || 'Please enter correct street',
                })}
              />
              <p className="message mt-2">{errors.billingStreet?.message}</p>
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>City *</Form.Label>
              <Form.Control
                placeholder="City"
                disabled={isIdentical}
                {...register('billingCity', {
                  validate: (value) => /^[a-zA-Z]/.test(value) || 'Please enter correct city',
                })}
              />
              <p className="message mt-2">{errors.billingCity?.message}</p>
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>Postal code *</Form.Label>
              <Form.Control
                placeholder="Postal code"
                disabled={isIdentical}
                {...register('billingPostalCode', {
                  validate: (value) =>
                    checkPostalCode(getValues('billingCountry'), value) || 'Please enter correct postal code',
                })}
              />
              <p className="message mt-2">{errors.billingPostalCode?.message}</p>
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>Country *</Form.Label>
              <Form.Select
                disabled={isIdentical}
                {...register('billingCountry', {
                  validate: (value) => value !== 'Choose...' || 'Please choose country',
                  onChange: () => {
                    trigger('billingPostalCode');
                  },
                })}
              >
                <option>Choose...</option>
                <option>Canada</option>
                <option>United States</option>
              </Form.Select>
              <p className="message mt-2">{errors.billingCountry?.message}</p>
            </Form.Group>
            <Form.Check
              className="mt-2"
              type="switch"
              data-testid="default-billing"
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
        <div className="d-flex justify-content-center mt-3 mb-4">
          <p>Already have an account?</p>
          <NavLink className="sign-up" to={RoutesEnum.LOGIN_ROUTE}>
            Sign In
          </NavLink>
        </div>
      </Form>
    </Container>
  );
}
