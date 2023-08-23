import Header from '@containers/Header';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

describe('Header tests', () => {
  test('renders Header correctly', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );

    expect(screen.getByText(`Pages d'Évasion`)).toBeInTheDocument();
  });
});
