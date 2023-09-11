import React from 'react';
import { Button, Container, ListGroup, Form, Col } from 'react-bootstrap';
// import { NavLink, Navigate, useNavigate } from 'react-router-dom';
// import { ToastContainer, toast, Slide } from 'react-toastify';
// import { RoutesEnum } from '../../utils/enums';
// import { Context } from '../../utils/createContext';

// import 'react-toastify/dist/ReactToastify.css';
import './Cart.scss';
import placeholder from '../../assets/placeholder.jpg';
import del from '../../assets/delete.svg';

export function Cart(): JSX.Element {
  return (
    <Container className="d-flex mt-3 cart gap-3">
      <Col sm={12} md={9}>
        <ListGroup className="w-100">
          <ListGroup.Item className="d-flex flex-row mb-3 p-2 item">
            <Col lg={3} md={4} className="d-flex justify-content-center">
              <img className="item-img" src={placeholder} alt="book" />
            </Col>
            <Col lg={9} md={8} className="d-flex align-items-center flex-wrap">
              <Col lg={5} xs={12}>
                <h3>Harry Potter</h3>
              </Col>
              <Col lg={4} xs={6} className="d-flex flex-column align-items-center p-0 mt-4">
                <div className="d-flex quantity-block">
                  <Button variant="secondary" className="quantity">
                    -
                  </Button>
                  <div className="quantity">1</div>
                  <Button variant="secondary" className="quantity">
                    +
                  </Button>
                </div>
                <div className="text-secondary">10$ unit</div>
              </Col>
              <Col lg={2} xs={3}>
                <h3 className="m-0 text-center font-weight-500">10$</h3>
              </Col>
              <Col lg={1} xs={3} xxs={{ order: 2 }} className="d-flex justify-content-center">
                <button type="button" className="delete-btn p-1">
                  <img src={del} alt="delete" />
                </button>
              </Col>
            </Col>
          </ListGroup.Item>
        </ListGroup>
      </Col>
      <Col sm={12} md={3} className="d-flex flex-column align-items-center p-0 mb-3">
        <Form className="d-flex flex-column justify-content-between total w-100 p-3">
          <Form.Text className="d-flex justify-content-between mb-4">
            <h3>Total:</h3>
            <h3>10$</h3>
          </Form.Text>
          <Form.Group className="mb-3">
            <Form.Control placeholder="Have a promocode?" />
          </Form.Group>
          <Button type="submit">Place order</Button>
        </Form>
        <Button variant="outline-secondary" className="mt-4">
          Clear cart
        </Button>
      </Col>
    </Container>
  );
}
