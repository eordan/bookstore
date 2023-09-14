import React from 'react';
import { Container } from 'react-bootstrap';
import { StringUndefined } from '../../utils/types';

interface Props {
  description: StringUndefined;
}

export function BookDescription({ description }: Props): JSX.Element {
  return (
    <Container>
      <h2>Description</h2>
      {description}
    </Container>
  );
}
