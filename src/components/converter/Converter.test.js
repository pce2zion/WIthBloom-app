import React from 'react';
import { render } from '@testing-library/react';
import Converter from './Converter';

test('renders currency converter form', () => {
  const { getByText, getByLabelText } = render(<Converter />);
  
  // Ensure that the form elements are rendered
  const fromCurrencyInput = getByLabelText('From Currency');
  const toCurrencyInput = getByLabelText('To Currency');
  const amountInput = getByLabelText('Amount');
  const convertButton = getByText('Convert');

  expect(fromCurrencyInput).toBeInTheDocument();
  expect(toCurrencyInput).toBeInTheDocument();
  expect(amountInput).toBeInTheDocument();
  expect(convertButton).toBeInTheDocument();
});

test('initial state should be empty', () => {
  const { getByLabelText } = render(<Converter />);
  
  // Ensure that the initial input values are empty
  const fromCurrencyInput = getByLabelText('From Currency');
  const toCurrencyInput = getByLabelText('To Currency');
  const amountInput = getByLabelText('Amount');

  expect(fromCurrencyInput).toHaveValue('');
  expect(toCurrencyInput).toHaveValue('');
  expect(amountInput).toHaveValue('');
});

//testing the handle change funcion
test('updates form data when inputs change', () => {
    const { getByLabelText } = render(<Converter />);
    const fromCurrencyInput = getByLabelText('From Currency');
  
    // Simulate changing the value of the 'From Currency' input
    fireEvent.change(fromCurrencyInput, { target: { value: 'USD' } });
  
    // Check if the form data was updated
    expect(fromCurrencyInput).toHaveValue('USD');
  });

  //testing clacRate function
  test('calculates the rate correctly', () => {
    const { getByLabelText, getByText } = render(<Converter />);
    const fromCurrencyInput = getByLabelText('From Currency');
    const toCurrencyInput = getByLabelText('To Currency');
    const amountInput = getByLabelText('Amount');
  
    // Set values for testing
    fireEvent.change(fromCurrencyInput, { target: { value: 'USD' } });
    fireEvent.change(toCurrencyInput, { target: { value: 'EUR' } });
    fireEvent.change(amountInput, { target: { value: '100' } });
  
    // Calculate the rate
    const convertButton = getByText('Convert');
    fireEvent.click(convertButton);
  
    // Assert that the rate is calculated correctly and displayed
    const rateDisplay = getByText('Calculated Rate: $123.45'); // Replace with the expected rate
    expect(rateDisplay).toBeInTheDocument();
  });

//   testing handle submit function
test('displays an alert if amount is not entered', () => {
    const { getByText } = render(<Converter />);
    const convertButton = getByText('Convert');
  
    // Click the 'Convert' button without entering an amount
    fireEvent.click(convertButton);
  
    // Assert that the alert is displayed
    const alertMessage = getByText('Enter an amount');
    expect(alertMessage).toBeInTheDocument();
  });
  