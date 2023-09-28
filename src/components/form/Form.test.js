import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import Form from './Form';

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
  render(<Form />);

  await waitFor(() => {
    const btcngnRate = screen.getByText('BTCNGN: 26297091.5724');
    const btcbusdRate = screen.getByText('BTCBUSD: 26068.7295');
  
    expect(btcngnRate).toBeInTheDocument();
    expect(btcbusdRate).toBeInTheDocument();
  
  });
});

test('displays an alert if data fetch fails', async () => {
  global.fetch.mockImplementationOnce(() =>
    Promise.reject('Network error')
  );

  render(<Form/>);

  await waitFor(() => {
    const alertMessage = screen.getByText('Error fetching data: Network error');
    expect(alertMessage).toBeInTheDocument();
  });
});

