import React from 'react';
import { Container } from 'react-bootstrap';

import './Main.scss';
import SuccessMessage from '@components/SuccessMessage';

export function Main(): JSX.Element {
  // const [message, setMessage] = useState('');
  // if (login) setMessage('Successfully logged in')
  // if (registered) setMessage('Succesfully registered')

  return (
    <section className="main">
      <Container className="d-flex main-container">
        <SuccessMessage message="Successfully logged in" />
        <h1 className="title">We love literature</h1>
      </Container>
    </section>
  );
}
