import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { RoutesEnum } from '../../utils/enums';

import './OopsDiv.scss';

import robot from '../../assets/robot.svg';
import arrow from '../../assets/left-arrow.svg';

export function OopsDiv(): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className="p-5 bg-light">
      <Container className="d-flex justify-content-center flex-column align-items-center text-center">
        <img src={robot} alt="robot" className="robot" />
        <h3 className="m-3">Oops...</h3>
        <p className="oopsDiv-subtitle">We can&apos;t seem to find the page you&apos;re looking for</p>
        <Button variant="success" onClick={() => navigate(RoutesEnum.MAIN_ROUTE)}>
          Back to Home
        </Button>
        <h4 className="mt-5 mb-3">Are you looking for...</h4>
        <div>
          <div className="d-flex mt-2">
            <img className="right-arrow oops-arrow" src={arrow} alt="arrow" />
            <NavLink style={{ textDecoration: 'none', color: 'inherit' }} to={RoutesEnum.MAIN_ROUTE}>
              Home
            </NavLink>
          </div>
          <div className="d-flex mt-2">
            <img className="right-arrow oops-arrow" src={arrow} alt="arrow" />
            <NavLink style={{ textDecoration: 'none', color: 'inherit' }} to={RoutesEnum.PRODUCTS_ROUTE}>
              Products
            </NavLink>
          </div>
          <div className="d-flex mt-2">
            <img className="right-arrow oops-arrow" src={arrow} alt="arrow" />
            <NavLink style={{ textDecoration: 'none', color: 'inherit' }} to={RoutesEnum.CONTACTS_ROUTE}>
              Contacts
            </NavLink>
          </div>
        </div>
      </Container>
    </div>
  );
}
