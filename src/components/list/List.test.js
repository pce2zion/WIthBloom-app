import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import List from './List';

// Mocking the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        data: {
          rates: {
            BTCNGN: 26297091.5724,
            BTCBUSD: 26068.7295,
            // Add more rates as needed
          },
        },
      }),
  })
);

test('fetches data and renders exchange rates', async () => {
  render(<List />);

  // Wait for the data to be fetched and the component to re-render
  await waitFor(() => {
    const btcngnRate = screen.getByText('BTCNGN: 26297091.5724');
    const btcbusdRate = screen.getByText('BTCBUSD: 26068.7295');
    // Add more assertions for other rates as needed

    expect(btcngnRate).toBeInTheDocument();
    expect(btcbusdRate).toBeInTheDocument();
    // Add more assertions for other rates as needed
  });
});

test('displays an alert if data fetch fails', async () => {
  // Mocking a failed fetch
  global.fetch.mockImplementationOnce(() =>
    Promise.reject('Network error')
  );

  render(<List />);

  // Wait for the data fetch to fail and the alert message to appear
  await waitFor(() => {
    const alertMessage = screen.getByText('Error fetching data: Network error');
    expect(alertMessage).toBeInTheDocument();
  });
});

test('handles form input change', () => {
  render(<List />);

  const input = screen.getByLabelText('Search');
  fireEvent.change(input, { target: { value: 'BTC' } });

  // Check if the input value changes
  expect(input).toHaveValue('BTC');
});

test('filters exchange rates based on input', async () => {
  render(<List />);

  const input = screen.getByLabelText('Search');
  fireEvent.change(input, { target: { value: 'BTC' } });

  // Wait for the component to re-render with filtered data
  await waitFor(() => {
    const btcngnRate = screen.getByText('BTCNGN: 26297091.5724');
    const btcbusdRate = screen.getByText('BTCBUSD: 26068.7295');

    // Ensure that only the matching rates are displayed
    expect(btcngnRate).toBeInTheDocument();
    expect(btcbusdRate).toBeInTheDocument();
  });
});

// Add more tests for other functionality in your component as needed
