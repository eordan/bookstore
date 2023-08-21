import React from 'react';
import { Nav } from 'react-bootstrap';

interface Props {
  to: string;
  title: string;
}

export function Links({ to, title }: Props): JSX.Element {
  return <Nav.Link href={to}>{title}</Nav.Link>;
}
