import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { StringUndefined } from '../../utils/types';

import './BookDescription.scss';
import books from '../../assets/books-description.svg';

interface Props {
  description: StringUndefined;
}

export function BookDescription({ description }: Props): JSX.Element {
  return (
    <Container className="p-4">
      <Row>
        <h4>Description</h4>
      </Row>
      <Row className="justify-content-center">
        <Col>
          <p className="book-description">{description}</p>
        </Col>
        <Col>
          <Image src={books} alt="bookshelf" />
        </Col>
      </Row>
    </Container>
  );
}
