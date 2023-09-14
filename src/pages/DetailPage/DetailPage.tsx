import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductCatalogData } from '@commercetools/platform-sdk';
import BookDescription from '@components/BookDescription';
import BookInfo from '@components/BookInfo';
import { getProduct } from '../../services/productsHandler/productsSearcher';

import './DetailPage.scss';

export function DetailPage(): JSX.Element {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductCatalogData>();
  const [url, setUrl] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
  const [discountedPrice, setDiscountedPrice] = useState<number>();

  useEffect(() => {
    if (id) {
      getProduct(id, 'US').then((data) => {
        setProduct(data.masterData);
        if (data.masterData.staged.masterVariant.images) {
          const img = data.masterData.staged.masterVariant.images[0];
          setUrl(img.url);
        }
        if (data?.masterData.staged.masterVariant.attributes) {
          const attribute = data.masterData.staged.masterVariant.attributes[0];
          setAuthor(attribute.value);
        }
        if (data?.masterData.staged.masterVariant.prices) {
          const attribute = data.masterData.staged.masterVariant.prices[0];
          setPrice((attribute.value.centAmount / 100).toFixed(2));
          if (attribute.discounted) {
            setDiscountedPrice(attribute.discounted.value.centAmount);
          }
        }
      });
    }
  }, []);

  return (
    <section className="bg-light">
      <BookInfo
        title={product?.staged.name.en}
        url={url}
        author={author}
        price={price}
        discountedPrice={discountedPrice}
      />
      <BookDescription description={product?.staged.metaDescription?.en} />
    </section>
  );
}
