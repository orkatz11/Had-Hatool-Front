import React from 'react';
import { render, screen } from '@testing-library/react';
// import App from './App';
import Game_view from './game_view';

test('renders learn react link', () => {
  render(<Game_view />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
