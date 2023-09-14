import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Carousel, Col, Container, Row, Image } from 'react-bootstrap';
import SliderModal from '@containers/SliderModal';
import { RoutesEnum } from '../../utils/enums';
import { NumberUndefined, StringUndefined } from '../../utils/types';

import Lorem1 from '../../assets/lorem1.jpg';
import Lorem2 from '../../assets/lorem2.jpg';
import rightArrow from '../../assets/right-arrow.svg';

interface Props {
  title: StringUndefined;
  url: string;
  author: string;
  price: string;
  discountedPrice: NumberUndefined;
}

export function BookInfo({ title, url, author, price, discountedPrice }: Props) {
  const [modalShow, setModalShow] = useState(false);

  return (
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
        <p className="last-crumb mb-0">{title}</p>
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
          <h1>{title}</h1>
          <h3>Author: {author}</h3>
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
  );
}
