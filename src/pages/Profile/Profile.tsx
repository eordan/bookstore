import React, { useState } from 'react';
import { Container, ListGroup } from 'react-bootstrap';

import 'react-toastify/dist/ReactToastify.css';
import './Profile.scss';
import { PersonalInfo } from '@components/PersonalInfo/PersonalInfo';
import Addresses from '@components/Addresses';
import ChangePassword from '@components/ChangePassword';

export function Profile(): JSX.Element {
  const [selectedCategory, setSelectedCategory] = useState('Personal Info');

  const categories = ['Personal Info', 'Change Password', 'Addresses'];

  const showCategory = () => {
    switch (selectedCategory) {
      case 'Personal Info':
        return <PersonalInfo />;
      case 'Change Password':
        return <ChangePassword />;
      case 'Addresses':
        return <Addresses />;
      default:
        return <PersonalInfo />;
    }
  };

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
