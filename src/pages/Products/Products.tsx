import ProductList from '@components/ProductList';
import Filters from '@containers/Filters';
import Breadcrumb from '@components/Breadcrumbs';
import React, { useContext, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { getQueryDetails, searchProducts } from '../../services/productsHandler/productsSearcher';
import { Context } from '../../utils/createContext';

export function Products(): JSX.Element {
  const { store } = useContext(Context);

  const [search, setSearch] = useState('');

  const filters = () => {
    store.setText(search);
    searchProducts(getQueryDetails(store.text, store.filter, store.sort)).then((data) => {
      store.setProducts(data.results);
    });
  };

  return (
    <section className="bg-light">
      <Container>
        <Form className="d-flex justify-content-end pt-4">
          <Row>
            <Col>
              <Form.Select
                onChange={(e) => {
                  store.setSort(e.target.value);
                  filters();
                }}
              >
                <option value="variants.attributes.rating desc">By Score Descending</option>
                <option value="variants.attributes.rating asc">By Score Ascending</option>
                <option value="name.en asc">Alphabetically Ascending</option>
                <option value="name.en desc">Alphabetically Descending</option>
                <option value="price asc">By Price Ascending</option>
                <option value="price desc">By Price Descending</option>
              </Form.Select>
            </Col>
            <Col className="d-flex align-items-center">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button variant="outline-success" onClick={filters}>
                Search
              </Button>
            </Col>
          </Row>
        </Form>
        <Row className="mt-4">
          <Col md={3}>
            <Filters />
          </Col>
          <Col md={9}>
            <Row>
              <Breadcrumb />
            </Row>
            <Row>
              <ProductList />
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
