import ProductItem from '@components/ProductItem';
import React, { useContext, useEffect } from 'react';
import { Row } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Context } from '../../utils/createContext';
import { getQueryDetails, searchProducts } from '../../services/productsSearcher';

export const ProductList = observer(() => {
  const { store } = useContext(Context);

  useEffect(() => {
    searchProducts(getQueryDetails(undefined, undefined, 'name.en asc')).then((data) => {
      store.setProducts(data.results);
    });
  }, []);

  return (
    <Row xs={1} md={2} lg={3} xl={4} className="g-3 mb-5">
      {store.products.length ? (
        store.products.map((product) => <ProductItem key={product.id} product={product} />)
      ) : (
        <h3>Sorry... We haven&apos;t found any books with such parameters</h3>
      )}
    </Row>
  );
});
