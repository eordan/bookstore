import Header from '@containers/Header';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { LINKS_ARRAY } from '../../src/utils/constants';

describe('Header tests', () => {
  test('renders Header correctly', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );

    expect(screen.getByText(`Pages d'Évasion`)).toBeInTheDocument();
    for (let i = 0; i < LINKS_ARRAY.length; i += 1) {
      expect(screen.getByText(`${LINKS_ARRAY[i].title}`)).toBeInTheDocument();
    }
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByRole(`button`, { name: 'Registration' })).toBeInTheDocument();
  });
});
