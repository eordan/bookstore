import ProductList from '@components/ProductList';
import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

export function Products(): JSX.Element {
  const [isPriceSort, setIsPriceSort] = useState(false);
  const [priceSort, setPriceSort] = useState('&darr;');
  const [isAlphabeticalSort, setIsAlphabeticalSort] = useState(false);
  const [alphabeticalSort, setAlphabeticalSort] = useState('&darr;');

  return (
    <section className=" mt-3 bg-light">
      <Container>
        <Form className="d-flex justify-content-end pt-4">
          <Row>
            <Col className="d-flex justify-content-around align-items-center">
              <Form.Check
                type="checkbox"
                checked={isPriceSort}
                onChange={(e) => setIsPriceSort(e.target.checked)}
                label="Sort by price?"
              />
              {isPriceSort && (
                <Button
                  className="sort-btn"
                  dangerouslySetInnerHTML={{ __html: priceSort }}
                  onClick={() => {
                    if (priceSort === '&darr;') setPriceSort('&uarr;');
                    else setPriceSort('&darr;');
                  }}
                />
              )}
              <Form.Check
                type="checkbox"
                checked={isAlphabeticalSort}
                onChange={(e) => setIsAlphabeticalSort(e.target.checked)}
                label="Sort alphabetically?"
              />
              {isAlphabeticalSort && (
                <Button
                  dangerouslySetInnerHTML={{ __html: alphabeticalSort }}
                  onClick={() => {
                    if (alphabeticalSort === '&darr;') setAlphabeticalSort('&uarr;');
                    else setAlphabeticalSort('&darr;');
                  }}
                />
              )}
            </Col>
            <Col className="d-flex">
              <Form.Control type="search" placeholder="Search" className="me-2" />
              <Button variant="outline-success">Search</Button>
            </Col>
          </Row>
        </Form>
        <Row className="mt-4">
          <Col md={3}>
            <Form.Control />
          </Col>
          <Col md={9}>
            <ProductList />
          </Col>
        </Row>
      </Container>
    </section>
  );
}
