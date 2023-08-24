import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Reg from '../../src/pages/Reg';

describe('Registration tests', () => {
  test('renders Registration correctly', () => {
    render(
      <BrowserRouter>
        <Reg />
      </BrowserRouter>,
    );

    expect(screen.getByText(`Email`)).toBeInTheDocument();
    expect(screen.getByText('Password *')).toBeInTheDocument();
    expect(screen.getByText(`Repeat password *`)).toBeInTheDocument();
    expect(screen.getByText('First Name *')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Get started' })).toBeInTheDocument();
  });

  test('Registration validates behaviour', async () => {
    render(
      <BrowserRouter>
        <Reg />
      </BrowserRouter>,
    );

    await userEvent.click(screen.getByRole('button', { name: 'Get started' }));
    expect(screen.getByText('Please enter correct name')).toBeInTheDocument();
    expect(screen.getByText('Please enter correct last name')).toBeInTheDocument();
    expect(screen.getByText('Minimum 13 years old')).toBeInTheDocument();

    await userEvent.selectOptions(screen.getByTestId('shipping-country'), 'Belarus');
    await userEvent.type(screen.getByTestId('shipping-postal-code'), '123');
    expect(screen.getByText('Please enter correct postal code')).toBeInTheDocument();
  });

  test('Toggle buttons behavior', async () => {
    render(
      <BrowserRouter>
        <Reg />
      </BrowserRouter>,
    );

    expect(screen.getByTestId('default-shipping')).not.toBeChecked();

    await userEvent.click(screen.getByTestId('identical-toggle'));
    expect(screen.getByTestId('identical-toggle')).toBeChecked();

    await userEvent.click(screen.getByTestId('default-billing'));
    expect(screen.getByTestId('default-billing')).toBeChecked();
  });
});
