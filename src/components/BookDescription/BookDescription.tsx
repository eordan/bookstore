import React from 'react';
import { Container, Image } from 'react-bootstrap';
import { StringUndefined } from '../../utils/types';

import './BookDescription.scss';
import books from '../../assets/books-description.svg';

interface Props {
  description: StringUndefined;
}

export function BookDescription({ description }: Props): JSX.Element {
  return (
    <Container className="p-4">
      <h4>Description</h4>
      <div className="d-flex justify-content-between g-4">
        <p className="book-description">{description}</p>
        <Image src={books} alt="bookshelf" />
      </div>
    </Container>
  );
}
