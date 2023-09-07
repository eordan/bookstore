import React, { useContext } from 'react';
import { Button, Container } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Context } from '../../utils/createContext';

export const Breadcrumb = observer(() => {
  const { store } = useContext(Context);

  return (
    <Container>
      {store.breadcrumbs.map((breadcrumb) => (
        <Button
          key={breadcrumb.target.value}
          onClick={() => {
            breadcrumb.target.checked = false;
            breadcrumb.handler(breadcrumb.target);
          }}
        >
          {breadcrumb.name}
        </Button>
      ))}
    </Container>
  );
});
