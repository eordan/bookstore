import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

interface Props {
  to: string;
  title: string;
}

export function Links({ to, title }: Props): JSX.Element {
  return (
    <Nav.Link href="#">
      <NavLink style={{ textDecoration: 'none', color: 'inherit' }} to={to}>
        {title}
      </NavLink>
    </Nav.Link>
  );
}
