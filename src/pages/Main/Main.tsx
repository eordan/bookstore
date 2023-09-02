import React, { useContext, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import SuccessMessage from '@components/SuccessMessage';
import { ToastContainer, toast } from 'react-toastify';
import { Context } from '../../utils/createContext';

import 'react-toastify/dist/ReactToastify.css';

import './Main.scss';

export function Main(): JSX.Element {
  const user = useContext(Context);

  const notify = () => {
    toast('Successfully logged in', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    });
  };

  // useEffect(() => {
  //   if (user.isEntered) {
  //     notify();
  //   }
  // }, [user.isEntered]);

  if (user.isEntered) {
    useEffect(() => notify());
  }

  return (
    <section className="main">
      <Container className="d-flex main-container">
        {user.isEntered && <SuccessMessage message="Successfully logged in" />}
        <h1 className="title">We love literature</h1>
        <ToastContainer />
      </Container>
    </section>
  );
}
