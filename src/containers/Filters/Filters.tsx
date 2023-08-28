import React from 'react';
import { Accordion, Form } from 'react-bootstrap';

export function Filters(): JSX.Element {
  return (
    <Form>
      <Accordion defaultActiveKey={['']} alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Category</Accordion.Header>
          <Accordion.Body>
            <Form.Check type="checkbox" label="Fantasy" />
            <Form.Check type="checkbox" label="Love" />
            <Form.Check type="checkbox" label="History" />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Author</Accordion.Header>
          <Accordion.Body>
            <Form.Check type="checkbox" label="Adknf" />
            <Form.Check type="checkbox" label="LJ" />
            <Form.Check type="checkbox" label="LKJWbe djb" />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Book cover</Accordion.Header>
          <Accordion.Body>
            <Form.Check type="checkbox" label="Hardcover" />
            <Form.Check type="checkbox" label="Paperback" />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Form>
  );
}
