import React, { useState, useContext, useEffect } from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import { PersonalInfo } from '@components/PersonalInfo/PersonalInfo';
import Addresses from '@components/Addresses';
import ChangePassword from '@components/ChangePassword';
import { Customer } from '@commercetools/platform-sdk';
import { useNavigate } from 'react-router-dom';
import { RoutesEnum } from '../../utils/enums';
import { getCustomer } from '../../services/profileHandler/profileGetter';
import { Context } from '../../utils/createContext';

import 'react-toastify/dist/ReactToastify.css';
import './Profile.scss';

export function Profile(): JSX.Element {
  const [selectedCategory, setSelectedCategory] = useState('Personal Info');
  const [userData, setUserData] = useState<Customer>();
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const categories = ['Personal Info', 'Change Password', 'Addresses'];

  useEffect(() => {
    if (localStorage.getItem('isAuth') === 'false') {
      navigate(RoutesEnum.LOGIN_ROUTE);
    }
  }, [localStorage.getItem('isAuth')]);

  const loadData = () => {
    getCustomer(user.id).then((data) => {
      setUserData(data);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const showCategory = () => {
    if (userData) {
      switch (selectedCategory) {
        case 'Personal Info':
          return <PersonalInfo {...userData} />;
        case 'Change Password':
          return <ChangePassword />;
        case 'Addresses':
          return <Addresses userData={userData} loadData={loadData} />;
        default:
          return <PersonalInfo {...userData} />;
      }
    }
    return null;
  };

  if (!userData) {
    return <h3 className="text-center">Loading...</h3>;
  }

  return (
    <Container className="d-flex profile">
      <ListGroup variant="flush" className="mt-3">
        {categories.map((category: string) => (
          <ListGroup.Item
            key={category}
            action
            variant="light"
            onClick={() => {
              setSelectedCategory(category);
              loadData();
            }}
            active={category === selectedCategory}
          >
            {category}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <div>{showCategory()}</div>
    </Container>
  );
}
