import React, { useEffect, useState } from 'react';
import { Carousel, Col, Container, Row, Image } from 'react-bootstrap';
import { NavLink, useParams } from 'react-router-dom';
import { ProductCatalogData } from '@commercetools/platform-sdk';
import SliderModal from '@containers/SliderModal';
import { getProduct } from '../../services/productsHandler/productsSearcher';
import { RoutesEnum } from '../../utils/enums';

import './DetailPage.scss';
import Lorem1 from '../../assets/lorem1.jpg';
import Lorem2 from '../../assets/lorem2.jpg';
import rightArrow from '../../assets/right-arrow.svg';


export function DetailPage(): JSX.Element {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductCatalogData>();
  const [url, setUrl] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
  const [discountedPrice, setDiscountedPrice] = useState<number>();
  const [modalShow, setModalShow] = useState(false);

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
      <Container>
        <div className="d-flex align-items-center mt-4 mb-5">
          <NavLink style={{ textDecoration: 'none', color: '#252b42' }} to={RoutesEnum.MAIN_ROUTE}>
            Home
          </NavLink>
          <img className="right-arrow" src={rightArrow} alt="arrow" />
          <NavLink style={{ textDecoration: 'none', color: '#252b42' }} to={RoutesEnum.PRODUCTS_ROUTE}>
            Products
          </NavLink>
          <img className="right-arrow" src={rightArrow} alt="arrow" />
          <p className="last-crumb mb-0">{product?.staged.name.en}</p>
        </div>
        <Row className="d-flex justify-content-center">
          <SliderModal show={modalShow} onHide={() => setModalShow(false)} url={url} />
          <Col md={3}>
            <Carousel variant="dark" onClick={() => setModalShow(true)}>
              <Carousel.Item>
                <Image className="w-100" src={url} fluid />
              </Carousel.Item>
              <Carousel.Item>
                <Image className="w-100" src={Lorem1} fluid />
              </Carousel.Item>
              <Carousel.Item>
                <Image className="w-100" src={Lorem2} fluid />
              </Carousel.Item>
            </Carousel>
          </Col>
          <Col className="description p-5" md={8}>
            <h1>{product?.staged.name.en}</h1>
            <h3>Author: {author}</h3>
            <div className="mt-4">{product?.staged.metaDescription?.en}</div>
            {discountedPrice ? (
              <div className="d-flex align-items-center">
                <p className="detailed old-price">{price}</p>
                <p className="detailed price">{(discountedPrice / 100).toFixed(2)}</p>
              </div>
            ) : (
              <p className="detailed price mt-4">{price}</p>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
}
