import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; 
import SignUp from './SignUp';
import { BrowserRouter as Router } from 'react-router-dom';

describe('SignUp', () => {
  it('renders without crashing', () => {
    render(<Router><SignUp /></Router>);
  });

  it('shows error message when form is submitted with no data', async () => {
    render(<Router><SignUp /></Router>);
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(screen.getByText('Please fill in your details')).toBeInTheDocument();
    });
  });

  it('shows error message when passwords do not match', async () => {
    render(<Router><SignUp /></Router>);
    fireEvent.change(screen.getByTestId('password-input'), {
      target: { value: 'password123' }, 
    });
    fireEvent.change(screen.getByTestId('confirmPassword-input'), {
      target: { value: 'differentpassword' }, 
    });
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(screen.getByText("Passwords don't match")).toBeInTheDocument();
    });
  });

  it('shows error message when password is too short', async () => {
    render(<Router><SignUp /></Router>);
    fireEvent.change(screen.getByTestId('password-input'), {
      target: { value: 'short' }, 
    });
    fireEvent.change(screen.getByTestId('confirmPassword-input'), {
      target: { value: 'short' }, 
    });
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(screen.getByText('Your password should be greater than six characters')).toBeInTheDocument();
    });
  });

  
});
