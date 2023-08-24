import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Page404 from '../../src/pages/Page404';

describe('Footer test', () => {
  test('renders Footer correctly', () => {
    render(
      <BrowserRouter>
        <Page404 />
      </BrowserRouter>,
    );

    expect(screen.getByTestId(`header-404`)).toBeInTheDocument();
    expect(screen.getByAltText('robot')).toBeInTheDocument();
    expect(screen.getByText('Are you looking for...')).toBeInTheDocument();
    expect(screen.getByText("We can't seem to find the page you're looking for")).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Back to Home' })).toBeInTheDocument();
  });
});
