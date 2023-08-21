import React from 'react';
import { Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import { RoutesEnum } from '../../utils/enums';
import rightArrow from '../../assets/right-arrow.svg';

export function Div404(): JSX.Element {
  return (
    <Container className="d-flex justify-content-center flex-column align-items-center mb-4">
      <h1 className="m-2">404</h1>
      <div className="d-flex align-items-center">
        {/* <p className="mb-0">Home</p> */}
        <NavLink style={{ textDecoration: 'none', color: 'inherit' }} to={RoutesEnum.MAIN_ROUTE}>
          Home
        </NavLink>
        <img className="right-arrow" src={rightArrow} alt="arrow" />
        <p className="mb-0">404</p>
      </div>
    </Container>
  );
}
