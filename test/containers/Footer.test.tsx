import Footer from '@containers/Footer';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { LINKS_ARRAY } from '../../src/utils/constants';

describe('Footer test', () => {
  test('renders Footer correctly', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>,
    );

    expect(screen.getByText(`Pages d'Évasion`)).toBeInTheDocument();
    for (let i = 0; i < LINKS_ARRAY.length; i += 1) {
      expect(screen.getByText(`${LINKS_ARRAY[i].title}`)).toBeInTheDocument();
    }
    expect(screen.getByAltText('github')).toBeInTheDocument();
  });
});
