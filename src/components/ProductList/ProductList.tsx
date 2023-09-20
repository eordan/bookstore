import ProductItem from '@components/ProductItem';
import React, { useContext, useEffect } from 'react';
import { Row } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Context } from '../../utils/createContext';
import { defaultResultsLimit, getQueryDetails, searchProducts } from '../../services/productsHandler/productsSearcher';

export const ProductList = observer(() => {
  const { store } = useContext(Context);

  useEffect(() => {
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
  }, [store.page]);

  return (
    <Row xs={1} sm={2} lg={3} xl={4} className="g-3 mb-5 justify-content-center">
      {store.products.length ? (
        store.products.map((product) => <ProductItem key={product.id} product={product} />)
      ) : (
        <h3>Sorry... We haven&apos;t found any books with such parameters</h3>
      )}
    </Row>
  );
});
