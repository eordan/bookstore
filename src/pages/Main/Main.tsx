import React, { useContext, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { ToastContainer, toast, Slide } from 'react-toastify';
import { Context } from '../../utils/createContext';

import 'react-toastify/dist/ReactToastify.css';

import './Main.scss';

export function Main(): JSX.Element {
  const user = useContext(Context);

  const notify = () => {
    toast.success('Successfully logged in', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
      transition: Slide,
      theme: 'colored',
      className: 'success-message',
    });
  };

  useEffect(() => {
    if (user.isEntered) {
      notify();
      user.setIsEntered(false);
    }
  }, []);

  return (
    <section className="main">
      <Container className="d-flex main-container">
        <h1 className="title">We love literature</h1>
        <ToastContainer />
      </Container>
    </section>
  );
}
