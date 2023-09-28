import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; 
import Converter from './Converter';

describe('CurrencyConverter', () => {
  it('renders without crashing', () => {
    render(<Converter />);
  });

  it('displays an error message when no amount is entered', async () => {
    render(<Converter />);
    fireEvent.click(screen.getByText('Submit')); 

    await waitFor(() => {
      expect(screen.getByText('Enter an amount')).toBeInTheDocument();
    });
  });

  it('displays an error message for incorrect amount format', async () => {
    render(<Converter />);
    fireEvent.change(screen.getByTestId('amount-input'), {
      target: { value: 'abc' }, 
    });
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(screen.getByText('Please enter correct amount')).toBeInTheDocument();
    });
  });

  it('calculates and displays the converted amount', async () => {
    render(<Converter />);
    fireEvent.change(screen.getByTestId('from-currency-input'), {
      target: { value: 'USD' }, 
    });
    fireEvent.change(screen.getByTestId('to-currency-input'), {
      target: { value: 'EUR' }, 
    });
    fireEvent.change(screen.getByTestId('amount-input'), {
      target: { value: '100' }, 
    });
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(screen.getByText('Converted Amount:')).toBeInTheDocument();
    });
    expect(screen.getByText('Converted Amount: 2220')).toBeInTheDocument();
  });


});
