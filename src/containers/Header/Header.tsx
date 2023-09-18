import React, { useContext } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { LinkContainer } from 'react-router-bootstrap';
import Links from '@components/Links';
import { Context } from '../../utils/createContext';
import { RoutesEnum } from '../../utils/enums';
import { LINKS_ARRAY } from '../../utils/constants';

import './Header.scss';

import profile from '../../assets/profile.svg';
import cart from '../../assets/cart.svg';

export const Header = observer((): JSX.Element => {
  const { user, basket } = useContext(Context);
  const navigate = useNavigate();

  return (
    <Navbar collapseOnSelect expand="md" className="p-3">
      <Container>
        <LinkContainer to={RoutesEnum.MAIN_ROUTE}>
          <Navbar.Brand>Pages d&apos;Évasion</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {LINKS_ARRAY.map((link) => (
              <Links key={link.id} to={link.to} title={link.title} />
            ))}
          </Nav>
          <NavLink className="cart-btn me-5 text-decoration-none" to={RoutesEnum.CART_ROUTE}>
            <img src={cart} alt="cart" />
            <span className="ms-1 cart-counter">{basket.count}</span>
          </NavLink>
          {!user.isAuth && (
            <Nav className="d-flex nav-btns">
              <NavLink style={{ textDecoration: 'none' }} to={RoutesEnum.LOGIN_ROUTE}>
                Login
              </NavLink>
              <Button className="ml-3 registration-btn" onClick={() => navigate(RoutesEnum.REGISTRATION_ROUTE)}>
                Registration
              </Button>
            </Nav>
          )}
          {user.isAuth && (
            <Nav className="d-flex nav-btns">
              <button type="button" className="profile-btn" onClick={() => navigate(RoutesEnum.PROFILE_ROUTE)}>
                <img src={profile} alt="profile" />
              </button>
              <Button
                className="logout-btn"
                variant="dark"
                onClick={() => {
                  user.setIsAuth(false);
                  localStorage.setItem('isAuth', 'false');
                  localStorage.removeItem('userID');
                  localStorage.removeItem('userVersion');
                  navigate(RoutesEnum.MAIN_ROUTE);
                }}
              >
                Log Out
              </Button>
            </Nav>
          )}
        </Navbar.Collapse>
        <NavLink className="cart-btn mobile me-4 text-decoration-none" to={RoutesEnum.CART_ROUTE}>
          <img src={cart} alt="cart" />
          <span className="ms-1 cart-counter">{basket.count}</span>
        </NavLink>
      </Container>
    </Navbar>
  );
});
