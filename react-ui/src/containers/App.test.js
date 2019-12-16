import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders beer counter', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/beers/i);
  expect(linkElement).toBeInTheDocument();
});
