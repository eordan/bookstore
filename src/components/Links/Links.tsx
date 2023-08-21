import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

interface Props {
  to: string;
  title: string;
}

export function Links({ to, title }: Props): JSX.Element {
  return (
    <LinkContainer to={to}>
      <Nav.Link>{title}</Nav.Link>
    </LinkContainer>
  );
}
