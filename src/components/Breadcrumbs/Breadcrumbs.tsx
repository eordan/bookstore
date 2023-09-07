import React, { useContext } from 'react';
import { Button, Container } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Context } from '../../utils/createContext';

export const Breadcrumb = observer(() => {
  const { store } = useContext(Context);

  return (
    <Container>
      {store.breadcrumbs.map((breadcrumb) => (
        <Button key={breadcrumb.target.value}>{breadcrumb.name}</Button>
      ))}
    </Container>
  );
});
