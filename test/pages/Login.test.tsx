import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../../src/pages/Login';

function getPasswordInput() {
  return screen.getByPlaceholderText('Enter your password');
}

describe('Login tests', () => {
  test('renders Login correctly', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    );

    expect(screen.getByText(`Email *`)).toBeInTheDocument();
    expect(screen.getByText('Password *')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Get started' })).toBeInTheDocument();
  });

  test('Login validates behaviour', async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    );

    await userEvent.click(screen.getByRole('button', { name: 'Get started' }));
    expect(screen.getByText('Please enter your password')).toBeInTheDocument();
    expect(screen.getByText('Please enter your email')).toBeInTheDocument();

    await userEvent.type(screen.getByPlaceholderText('Enter your email'), 'asd-jdfsb');
    expect(screen.getByText('Please enter valid email')).toBeInTheDocument();

    await userEvent.type(getPasswordInput(), 'as');
    expect(screen.getByText('Minimum 8 characters')).toBeInTheDocument();

    await userEvent.type(getPasswordInput(), 'blablabl');
    expect(screen.getByText('At least 1 uppercase letter (A-Z)')).toBeInTheDocument();

    await userEvent.type(getPasswordInput(), 'blablablA');
    expect(screen.getByText('At least 1 digit (0-9)')).toBeInTheDocument();

    await userEvent.type(getPasswordInput(), 'blablablA1');
    expect(screen.getByText('At least 1 special symbol (!@#$%^&*)')).toBeInTheDocument();
  });
});
