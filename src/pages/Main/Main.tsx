import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import SuccessMessage from '@components/SuccessMessage';
import { Context } from '../../index';

import './Main.scss';

export function Main(): JSX.Element {
  const user = useContext(Context);

  return (
    <section className="main">
      <Container className="d-flex main-container">
        {user.isEntered && <SuccessMessage message="Successfully logged in" />}
        <h1 className="title">We love literature</h1>
      </Container>
    </section>
  );
}
