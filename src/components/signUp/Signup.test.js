import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';

// Mocking Firebase authentication functions
jest.mock('firebase/auth', () => ({
  onAuthStateChanged: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
}));

// Mocking useHistory from React Router
import { useNavigate } from 'react-router-dom';
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

// Mocking AOS.init
import AOS from 'aos';
import SignUp from './SignUp';
jest.mock('aos', () => ({
  init: jest.fn(),
}));

test('renders registration form', () => {
  render(<SignUp/>);
  
  const firstNameInput = screen.getByLabelText('First Name');
  const lastNameInput = screen.getByLabelText('Last Name');
  const emailInput = screen.getByLabelText('Email');
  const passwordInput = screen.getByLabelText('Password');
  const confirmPasswordInput = screen.getByLabelText('Confirm Password');
  const submitButton = screen.getByText('Register');
  
  expect(firstNameInput).toBeInTheDocument();
  expect(lastNameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(confirmPasswordInput).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});

test('handles input changes', () => {
  render(<SignUp />);
  
  const firstNameInput = screen.getByLabelText('First Name');
  const lastNameInput = screen.getByLabelText('Last Name');
  const emailInput = screen.getByLabelText('Email');
  const passwordInput = screen.getByLabelText('Password');
  const confirmPasswordInput = screen.getByLabelText('Confirm Password');
  
  fireEvent.change(firstNameInput, { target: { name: 'firstName', value: 'John' } });
  fireEvent.change(lastNameInput, { target: { name: 'lastName', value: 'Doe' } });
  fireEvent.change(emailInput, { target: { name: 'email', value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { name: 'password', value: 'password123' } });
  fireEvent.change(confirmPasswordInput, { target: { name: 'confirmPassword', value: 'password123' } });
  
  expect(firstNameInput).toHaveValue('John');
  expect(lastNameInput).toHaveValue('Doe');
  expect(emailInput).toHaveValue('test@example.com');
  expect(passwordInput).toHaveValue('password123');
  expect(confirmPasswordInput).toHaveValue('password123');
});

test('submits the registration form', async () => {
  const navigate = jest.fn();
  useNavigate.mockReturnValue(navigate);
  render(<SignUp/>);
  
  const submitButton = screen.getByText('Register');
  
  fireEvent.click(submitButton);
  
  // Assuming Firebase createUserWithEmailAndPassword is successful
  await waitFor(() => {
    expect(navigate).toHaveBeenCalledWith('/list', { state: { formData } });
  });
});

// Add more tests for other functionality in your component as needed
