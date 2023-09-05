import React, { useContext, useState } from 'react';
import { Accordion, Form } from 'react-bootstrap';
import MultiRangeSlider, { ChangeResult } from 'multi-range-slider-react';

import './Filters.scss';
import { AUTHORS, CATEGORIES } from '../../utils/constants';
import { searchProducts, getQueryDetails } from '../../services/productsSearcher';
import { Context } from '../../utils/createContext';

export function Filters(): JSX.Element {
  const { store } = useContext(Context);

  const [isHardcover, setIsHardcover] = useState(false);
  const [isPaperback, setIsPaperback] = useState(false);

  let isDiscount = false;

  let minValue = 0;
  let maxValue = 550;

  let categoriesChecked: string[] = [];
  let categoriesFilter = '';

  let authorsChecked: string[] = [];
  let authorsFilter = '';

  const getFiltersArray = () => {
    const filtersArray: string[] = [];
    if (categoriesFilter) filtersArray.push(categoriesFilter);
    if (authorsFilter) filtersArray.push(authorsFilter);
    if (isHardcover) filtersArray.push('variants.attributes.bookFormat:"Hardcover"');
    if (isPaperback) filtersArray.push('variants.attributes.bookFormat:"Paperback"');
    if (isDiscount) filtersArray.push('variants.scopedPriceDiscounted:true');
    filtersArray.push(`variants.price.centAmount:range (${minValue * 100} to ${maxValue * 100})`);
    store.setFilter(filtersArray);
    return filtersArray;
  };

  const filters = () => {
    searchProducts(getQueryDetails(store.text, getFiltersArray(), store.sort)).then((data) => {
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
            <Form.Check
              type="radio"
              label="Hardcover"
              aria-label="Hardcover"
              checked={isHardcover}
              onChange={() => {
                if (isPaperback) {
                  setIsPaperback(false);
                }
                setIsHardcover(true);
                filters();
              }}
            />
            <Form.Check
              type="radio"
              label="Paperback"
              aria-label="Paperback"
              checked={isPaperback}
              onChange={() => {
                if (isHardcover) {
                  setIsHardcover(false);
                }
                setIsPaperback(true);
                filters();
              }}
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Form.Group className="mt-2">
        <Form.Label className="price-label">Price</Form.Label>
        <MultiRangeSlider
          min={0}
          max={550}
          minValue={minValue}
          maxValue={maxValue}
          ruler={false}
          style={{ border: 'none', boxShadow: 'none' }}
          onChange={(e: ChangeResult) => {
            minValue = e.minValue;
            maxValue = e.maxValue;
            filters();
          }}
        />
      </Form.Group>
      <Form.Check
        type="checkbox"
        label="Show discounted products"
        className="mt-3"
        onChange={(e) => {
          isDiscount = e.target.checked;
          filters();
        }}
      />
    </Form>
  );
}
