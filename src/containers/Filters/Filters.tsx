import React, { useContext } from 'react';
import { Accordion, Form } from 'react-bootstrap';

import './Filters.scss';
import { AUTHORS, CATEGORIES } from '../../utils/constants';
import { searchProducts, getQueryDetails } from '../../services/productsSearcher';
import { Context } from '../../utils/createContext';

export function Filters(): JSX.Element {
  const { store } = useContext(Context);

  let categoriesChecked: string[] = [];
  let categoriesFilter = '';

  let authorsChecked: string[] = [];
  let authorsFilter = '';

  const getFiltersArray = () => {
    const filtersArray: string[] = [];
    if (categoriesFilter) filtersArray.push(categoriesFilter);
    if (authorsFilter) filtersArray.push(authorsFilter);
    return filtersArray;
  };

  const filters = () => {
    searchProducts(getQueryDetails(undefined, getFiltersArray())).then((data) => {
      console.log(data);
      store.setProducts(data.results);
    });
  };

  const categoriesControl = (isChecked: boolean, categoryId: string) => {
    if (isChecked) {
      categoriesChecked.push(`"${categoryId}"`);
    } else {
      categoriesChecked = categoriesChecked.filter((id) => id !== `"${categoryId}"`);
    }
    if (categoriesChecked.length) {
      categoriesFilter = `categories.id:${categoriesChecked.join(', ')}`;
    } else {
      categoriesFilter = '';
    }
    filters();
  };

  const authorsControl = (isChecked: boolean, authorId: string) => {
    if (isChecked && authorId.startsWith('range')) {
      authorsChecked.push(authorId);
    } else if (isChecked) {
      authorsChecked.push(`"${authorId}"`);
    } else if (authorId.startsWith('range')) {
      authorsChecked = authorsChecked.filter((id) => id !== authorId);
    } else {
      authorsChecked = authorsChecked.filter((id) => id !== `"${authorId}"`);
    }

    if (authorsChecked.length) {
      authorsFilter = `variants.attributes.author:${authorsChecked.join(', ')}`;
    } else {
      authorsFilter = '';
    }
    filters();
  };

  return (
    <Form>
      <Accordion defaultActiveKey={['']} alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Category</Accordion.Header>
          <Accordion.Body className="check-block">
            {Object.entries(CATEGORIES).map((category) => (
              <Form.Check
                key={category[1]}
                value={category[1]}
                type="checkbox"
                label={category[0]}
                aria-label={category[0]}
                onChange={(e) => categoriesControl(e.target.checked, e.target.value)}
              />
            ))}
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Author</Accordion.Header>
          <Accordion.Body className="check-block">
            {Object.entries(AUTHORS).map((author) => (
              <Form.Check
                key={author[1]}
                value={author[1]}
                type="checkbox"
                label={author[0]}
                aria-label={author[0]}
                onChange={(e) => authorsControl(e.target.checked, e.target.value)}
              />
            ))}
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
