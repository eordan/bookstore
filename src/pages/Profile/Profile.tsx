import React, { useState, useContext, useEffect } from 'react';
import { Container, ListGroup } from 'react-bootstrap';

import 'react-toastify/dist/ReactToastify.css';
import './Profile.scss';
import { PersonalInfo } from '@components/PersonalInfo/PersonalInfo';
import Addresses from '@components/Addresses';
import ChangePassword from '@components/ChangePassword';
import { Customer } from '@commercetools/platform-sdk';
import { getCustomer } from '../../services/profileGetter';
import { Context } from '../../utils/createContext';

export function Profile(): JSX.Element {
  const [selectedCategory, setSelectedCategory] = useState('Personal Info');
  const [userData, setUserData] = useState<Customer>();
  const { user } = useContext(Context);

  useEffect(() => {
    getCustomer(user.id).then((data) => {
      setUserData(data);
    });
  }, []);

  const categories = ['Personal Info', 'Change Password', 'Addresses'];

  const showCategory = () => {
    switch (selectedCategory) {
      case 'Personal Info':
        return (
          <PersonalInfo
            firstName={`${userData?.firstName}`}
            lastName={`${userData?.lastName}`}
            birth={`${userData?.dateOfBirth}`}
            email={`${userData?.email}`}
          />
        );
      case 'Change Password':
        return <ChangePassword />;
      case 'Addresses':
        return <Addresses />;
      default:
        return <Addresses />;
    }
  };

  if (!userData) {
    return <h3 className="text-center">Loading...</h3>;
  }

  return (
    <Container className="d-flex align-self-start" style={{ height: '-webkit-fill-available' }}>
      <ListGroup variant="flush" className="d-flex flex-column col-2 mt-3 me-5">
        {categories.map((category: string) => (
          <ListGroup.Item
            key={category}
            action
            variant="light"
            onClick={() => setSelectedCategory(category)}
            active={category === selectedCategory}
          >
            {category}
          </ListGroup.Item>
        ))}
      </ListGroup>
      {showCategory()}
    </Container>
  );
}
