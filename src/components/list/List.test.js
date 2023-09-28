import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for expect(...).toBeInTheDocument()
import List from './List'; // Import your component
import { BrowserRouter as Router } from 'react-router-dom';

describe('List', () => {
  it('renders without crashing', () => {
    render(<Router><List /></Router>);
  });

  it('fetches data from the API and displays it', async () => {
  
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => ({
        data: {
          rates: {
            BTCNGN: { key: 'BTCNGN', rate: 26297091.5724 },
            BTCBUSD: { key: 'BTCBUSD', rate: 26068.729499999998 },
          },
        },
      }),
    });

    render(<Router><List /></Router>);

    await screen.findByText('BTCNGN');
    await screen.findByText('BTCBUSD');

  });
});
