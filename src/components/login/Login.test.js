import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';

// Mocking Firebase authentication functions
jest.mock('firebase/auth', () => ({
  onAuthStateChanged: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
}));

// Mocking useHistory from React Router
import { useNavigate } from 'react-router-dom';
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

// Mocking AOS.init
import AOS from 'aos';
import Login from './Login';
jest.mock('aos', () => ({
  init: jest.fn(),
}));

test('renders login form', () => {
  render(<Login/>);
  
  const emailInput = screen.getByLabelText('Email');
  const passwordInput = screen.getByLabelText('Password');
  const rememberCheckbox = screen.getByLabelText('Remember me');
  const submitButton = screen.getByText('Submit');
  
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(rememberCheckbox).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});

test('handles input changes', () => {
  render(<Login/>);
  
  const emailInput = screen.getByLabelText('Email');
  const passwordInput = screen.getByLabelText('Password');
  const rememberCheckbox = screen.getByLabelText('Remember me');
  
  fireEvent.change(emailInput, { target: { name: 'email', value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { name: 'password', value: 'password123' } });
  fireEvent.click(rememberCheckbox);
  
  expect(emailInput).toHaveValue('test@example.com');
  expect(passwordInput).toHaveValue('password123');
  expect(rememberCheckbox).toBeChecked();
});

test('submits the form', async () => {
  const navigate = jest.fn();
  useNavigate.mockReturnValue(navigate);
  render(<Login />);
  
  const emailInput = screen.getByLabelText('Email');
  const passwordInput = screen.getByLabelText('Password');
  const submitButton = screen.getByText('Submit');
  
  fireEvent.change(emailInput, { target: { name: 'email', value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { name: 'password', value: 'password123' } });
  fireEvent.click(submitButton);
  
  // Assuming Firebase signInWithEmailAndPassword is successful
  await waitFor(() => {
    expect(navigate).toHaveBeenCalledWith('list'); // Check if it navigates to the 'list' page on success
  });
});

// Add more tests for other functionality in your component as needed
