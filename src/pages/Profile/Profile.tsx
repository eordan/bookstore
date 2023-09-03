import React from 'react';
import { Container, ListGroup } from 'react-bootstrap';

import 'react-toastify/dist/ReactToastify.css';
import './Profile.scss';
import { PersonalInfo } from '@components/PersonalInfo/PersonalInfo';

export function Profile(): JSX.Element {
  return (
    <Container className="d-flex align-self-start">
      <ListGroup variant="flush" className="d-flex flex-column col-2 mt-3 me-5">
        <ListGroup.Item action variant="light" active>Personal Info</ListGroup.Item>
        <ListGroup.Item action variant="light">Change Password</ListGroup.Item>
        <ListGroup.Item action variant="light">Addresses</ListGroup.Item>
      </ListGroup>
      <PersonalInfo />
    </Container>
  );
}
