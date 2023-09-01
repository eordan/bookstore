import React, { useEffect } from 'react';
import { Carousel, Col, Container, Image, Row } from 'react-bootstrap';
// import { useParams } from 'react-router-dom';
import placeholder from '../../assets/placeholder.jpg';

export function DetailPage(): JSX.Element {
  // Will be used when there is an api
  // const [product, setProduct] = useState({ info: [] });
  // const { id } = useParams();

  const product = {
    id: 1,
    title: 'Product 1',
    price: '100$',
    category: 'Fantasy',
    description: 'ladkjewkfnekj dkfjn ejwbf edwhd hdvfwefbw lkwdn skfn kjfb jsbdj ld. HJdhvewhkd sbs bdhj s',
  };

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('A function that will return the product using the id');
  }, []);

  return (
    <Container>
      <Row>
        <Col md={4}>
          <Carousel>
            <Carousel.Item>
              <Image src={placeholder} fluid />
            </Carousel.Item>
          </Carousel>
        </Col>
        <Col md={8}>
          <Row className="d-flex flex-column justify-content-center mt-3">
            <h2>{product.title}</h2>
            <div>{product.price}</div>
            <div>{product.description}</div>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
