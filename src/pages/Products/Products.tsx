import ProductList from '@components/ProductList';
import Filters from '@containers/Filters';
import React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

export function Products(): JSX.Element {
  return (
    <section className=" mt-3 bg-light">
      <Container>
        <Form className="d-flex justify-content-end pt-4">
          <Row>
            <Col>
              <Form.Select>
                <option value="1">Cheap ones first</option>
                <option value="2">Expensive ones first</option>
                <option value="3">Alphabetically</option>
              </Form.Select>
            </Col>
            <Col className="d-flex align-items-center">
              <Form.Control type="search" placeholder="Search" className="me-2" />
              <Button variant="outline-success">Search</Button>
            </Col>
          </Row>
        </Form>
        <Row className="mt-4">
          <Col md={3}>
            <Filters />
          </Col>
          <Col md={9}>
            <ProductList />
          </Col>
        </Row>
      </Container>
    </section>
  );
}
