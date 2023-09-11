import React from 'react';
import { Button, Container, CardGroup, Card, Form } from 'react-bootstrap';
// import { NavLink, Navigate, useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import { ToastContainer, toast, Slide } from 'react-toastify';
// import { RoutesEnum } from '../../utils/enums';
// import { loginCustomer } from '../../services/customerHandler/customerAuther';
// import { emailValidationRules, passwordValidationRules } from '../../utils/validation';
// import { Context } from '../../utils/createContext';

// import 'react-toastify/dist/ReactToastify.css';
import './Cart.scss';
import placeholder from '../../assets/lorem1.jpg';
import del from '../../assets/delete.svg';

export function Cart(): JSX.Element {
  return (
    <Container className="d-flex mt-3">
      <CardGroup className="col-9">
        <Card className="d-flex flex-row mb-3 p-2 item">
          <Container className="d-flex justify-content-center col-2">
            <Card.Img variant="left" className="item-img" src={placeholder} />
          </Container>
          <Card.Body className="d-flex align-items-center">
            <Card.Title className="col-5">Harry Potter</Card.Title>
            <Container className="d-flex flex-column align-items-center col-2">
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
            </Container>
            <Card.Title className="m-0 text-center font-weight-500 col-2">10$</Card.Title>
            <button type="button" className="delete-btn p-1">
              <img src={del} alt="delete" />
            </button>
          </Card.Body>
        </Card>
      </CardGroup>
      <Container className="d-flex flex-column align-items-center ms-3 p-0 col-3">
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
      </Container>
    </Container>
  );
}
