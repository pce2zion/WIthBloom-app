import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; 
import Login from './Login'; 
import { BrowserRouter as Router } from 'react-router-dom';

describe('Login', () => {
  it('renders without crashing', () => {
    render(<Router><Login /></Router>);
  });

  it('shows error message when form is submitted with no data', async () => {
    render(<Router><Login /></Router>);
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(screen.getByText('Please enter your credentials')).toBeInTheDocument();
    });
  });

  it('logs in successfully when valid data is provided', async () => {
    render(<Router><Login /></Router>);
    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: 'peaceobute65@@example.com' }, 
    });
    fireEvent.change(screen.getByTestId('password-input'), {
      target: { value: 'password123' }, 
    });
    fireEvent.click(screen.getByTestId('remember-checkbox')); 

   
    global.signInWithEmailAndPassword = jest.fn().mockResolvedValue();

    await waitFor(() => {
      expect(screen.getByText('Login success!')).toBeInTheDocument();
    });

 
    expect(navigate).toHaveBeenCalledWith('/list');
  });

});
