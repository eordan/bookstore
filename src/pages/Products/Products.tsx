import React, { useContext, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import { observer } from 'mobx-react-lite';
import ProductList from '@components/ProductList';
import Filters from '@containers/Filters';
import Breadcrumb from '@components/Breadcrumbs';
import Promotion from '@components/Promotion';
import { defaultResultsLimit, getQueryDetails, searchProducts } from '../../services/productsHandler/productsSearcher';
import { Context } from '../../utils/createContext';

export const Products = observer((): JSX.Element => {
  const { store } = useContext(Context);

  const [search, setSearch] = useState('');

  const filters = () => {
    store.setText(search);
    searchProducts(getQueryDetails(store.text, store.filter, store.sort, (store.page - 1) * defaultResultsLimit)).then(
      (data) => {
        if (data.total) {
          store.setTotal(data.total);
        } else {
          store.setTotal(0);
        }
        store.setProducts(data.results);
      },
    );
  };

  return (
    <section className="bg-light">
      <Promotion width="100%" />
      <Container>
        <Form className="d-flex justify-content-end pt-4">
          <Row>
            <Col>
              <Form.Select
                onChange={(e) => {
                  store.setSort(e.target.value);
                  store.setPage(1);
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
              <Button
                variant="outline-success"
                onClick={() => {
                  store.setPage(1);
                  filters();
                }}
              >
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
            <Row className="d-flex justify-content-center">
              <ProductList />
              <Container className="d-flex justify-content-center">
                <PaginationControl
                  page={store.page}
                  between={4}
                  total={store.total}
                  last
                  next
                  limit={defaultResultsLimit}
                  changePage={(page) => {
                    store.setPage(page);
                    filters();
                  }}
                  ellipsis={1}
                />
              </Container>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
});
