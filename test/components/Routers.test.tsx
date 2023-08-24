import App from '@components/App';
import AppRouter from '@components/AppRouter';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

describe('AppRouter tests', () => {
  test('test existing routes', async () => {
    render(<App />);

    const loginLink = screen.getByText(`Login`);
    const regLink = screen.getByRole('button', { name: `Registration` });

    await userEvent.click(loginLink);
    expect(screen.getByText(`Welcome Back`)).toBeInTheDocument();
    await userEvent.click(regLink);
    expect(screen.getByText(`Sign up for free`)).toBeInTheDocument();
  });

  test('test 404 route', () => {
    render(
      <MemoryRouter initialEntries={['/skndhkjsnfhks']}>
        <AppRouter />
      </MemoryRouter>,
    );
    expect(screen.getByTestId(`header-404`)).toBeInTheDocument();
  });
});
