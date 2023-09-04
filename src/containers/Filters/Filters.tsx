import React from 'react';
import { Accordion, Form } from 'react-bootstrap';

import './Filters.scss';
import { CATEGORIES } from '../../utils/constants';

export function Filters(): JSX.Element {
  return (
    <Form>
      <Accordion defaultActiveKey={['']} alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Category</Accordion.Header>
          <Accordion.Body className="categories">
            {Object.entries(CATEGORIES).map((category) => (
              <Form.Check key={category[1]} type="checkbox" label={category[0]} aria-label={category[0]} />
            ))}
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Author</Accordion.Header>
          <Accordion.Body>
            <Form.Check type="checkbox" label="Adknf" aria-label="Adknf" />
            <Form.Check type="checkbox" label="LJ" aria-label="LJ" />
            <Form.Check type="checkbox" label="LKJWbe djb" aria-label="LKJWbe djb" />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Book cover</Accordion.Header>
          <Accordion.Body>
            <Form.Check type="checkbox" label="Hardcover" aria-label="Hardcover" />
            <Form.Check type="checkbox" label="Paperback" aria-label="Paperback" />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Form.Group className="mt-2">
        <Form.Label className="price-label">Price</Form.Label>
        <div className="d-flex">
          <input type="number" className="price-input" min="0" value="0" />
          <span>&ensp;-&ensp;</span>
          <input type="number" max="500" className="price-input" value="500" />
        </div>
      </Form.Group>
      <Form.Check type="checkbox" label="Show discounted products" className="mt-3" />
    </Form>
  );
}
