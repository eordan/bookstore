import React, { useContext, useState } from 'react';
import { Accordion, Button, Form } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import MultiRangeSlider, { ChangeResult } from 'multi-range-slider-react';

import './Filters.scss';
import { AUTHORS, CATEGORIES } from '../../utils/constants';
import { searchProducts, getQueryDetails, defaultResultsLimit } from '../../services/productsHandler/productsSearcher';
import { Context } from '../../utils/createContext';

export const Filters = observer(() => {
  const { store } = useContext(Context);

  const [isHardcover, setIsHardcover] = useState(false);
  const [isPaperback, setIsPaperback] = useState(false);

  let minValue = 0;
  let maxValue = 550;

  let categoriesChecked: string[] = [];

  let authorsChecked: string[] = [];

  const getFiltersArray = () => {
    const filtersArray: string[] = [];
    if (store.categoriesFilter) {
      filtersArray.push(store.categoriesFilter);
    }
    if (store.authorsFilter) filtersArray.push(store.authorsFilter);
    if (isHardcover) filtersArray.push('variants.attributes.bookFormat:"Hardcover"');
    if (isPaperback) filtersArray.push('variants.attributes.bookFormat:"Paperback"');
    if (store.isDiscounted) filtersArray.push('variants.scopedPriceDiscounted:true');
    filtersArray.push(`variants.price.centAmount:range (${minValue * 100} to ${maxValue * 100})`);
    store.setFilter(filtersArray);
    return filtersArray;
  };

  const filters = () => {
    store.setPage(1);
    searchProducts(
      getQueryDetails(store.text, getFiltersArray(), store.sort, (store.page - 1) * defaultResultsLimit),
    ).then((data) => {
      if (data.total) {
        store.setTotal(data.total);
      } else {
        store.setTotal(0);
      }
      store.setProducts(data.results);
    });
  };

  const categoriesControl = (category: HTMLInputElement) => {
    if (category.checked) {
      categoriesChecked.push(`"${category.value}"`);
      store.pushCrumb({
        target: category,
        name: category.nextSibling?.textContent as string,
        attributesArray: categoriesChecked,
        handler: categoriesControl,
      });
    } else {
      categoriesChecked = categoriesChecked.filter((id) => id !== `"${category.value}"`);
      store.popCrumb({
        target: category,
        name: category.nextSibling?.textContent as string,
        attributesArray: categoriesChecked,
        handler: categoriesControl,
      });
    }

    if (categoriesChecked.length) {
      store.setCategoriesFilter(`categories.id:${categoriesChecked.join(', ')}`);
    } else {
      store.setCategoriesFilter('');
    }
    filters();
  };

  const authorsControl = (author: HTMLInputElement) => {
    if (author.checked) {
      authorsChecked.push(`"${author.value}"`);
      store.pushCrumb({
        target: author,
        name: author.nextSibling?.textContent as string,
        attributesArray: authorsChecked,
        handler: authorsControl,
      });
    } else {
      authorsChecked = authorsChecked.filter((id) => id !== `"${author.value}"`);
      store.popCrumb({
        target: author,
        name: author.nextSibling?.textContent as string,
        attributesArray: authorsChecked,
        handler: authorsControl,
      });
    }

    if (authorsChecked.length) {
      store.setAuthorsFilter(`variants.attributes.author:${authorsChecked.join(', ')}`);
    } else {
      store.setAuthorsFilter('');
    }
    filters();
  };

  return (
    <Form>
      <Button
        className="mb-3"
        variant="secondary"
        onClick={() => {
          store.clearBreadcrumbs();
          store.setAuthorsFilter('');
          store.setCategoriesFilter('');
          setIsHardcover(false);
          setIsPaperback(false);
          store.setIsDiscounted(false);
          filters();
        }}
      >
        Clear filters
      </Button>
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
                onChange={(e) => categoriesControl(e.target)}
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
                onChange={(e) => authorsControl(e.target)}
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
          label={false}
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
        checked={store.isDiscounted}
        onChange={(e) => {
          store.setIsDiscounted(e.target.checked);
          filters();
        }}
      />
    </Form>
  );
});
