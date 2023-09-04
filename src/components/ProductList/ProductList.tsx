import ProductItem from '@components/ProductItem';
import React, { useContext, useEffect } from 'react';
import { Row } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Context } from '../../utils/createContext';
import { searchProducts } from '../../services/productsSearcher';

export const ProductList = observer(() => {
  const { store } = useContext(Context);

  useEffect(() => {
    searchProducts(store.storeDetailes).then((data) => {
      store.setProducts(data.results);
      console.log(data);
    });
  }, []);

  return (
    <Row xs={1} md={2} lg={3} xl={4} className="g-3 mb-5">
      {store.products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </Row>
  );
});
