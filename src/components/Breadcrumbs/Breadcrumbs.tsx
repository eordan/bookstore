import React, { useContext } from 'react';
import { Button, Container } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Context } from '../../utils/createContext';

import './Breadcrumbs.scss';

export const Breadcrumb = observer(() => {
  const { store } = useContext(Context);

  return (
    <Container className="breadcrumbs">
      {store.breadcrumbs.map((breadcrumb) => (
        <Button
          variant="secondary"
          href={breadcrumb.target.value}
          key={breadcrumb.target.value}
          onClick={(e) => {
            e.preventDefault();
            breadcrumb.target.checked = false;
            breadcrumb.handler(breadcrumb.target);
          }}
          dangerouslySetInnerHTML={{ __html: `${breadcrumb.name} &times;` }}
        >
          {}
        </Button>
      ))}
    </Container>
  );
});
