import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { RoutesEnum } from '../../utils/enums';

import './OopsDiv.scss';

import robot from '../../assets/robot.svg';

export function OopsDiv(): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className="p-5 bg-light">
      <Container className="d-flex justify-content-center flex-column align-items-center text-center">
        <img src={robot} alt="robot" />
        <h3 className="m-3">Oops...</h3>
        <p className="oopsDiv-subtitle">We can&apos;t seem to find the page you&apos;re looking for</p>
        <Button variant="success" onClick={() => navigate(RoutesEnum.MAIN_ROUTE)}>
          Back to Home
        </Button>
        <h4 className="m-5">Are you looking for...</h4>
      </Container>
    </div>
  );
}
