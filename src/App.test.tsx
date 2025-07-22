import React from 'react';
import { render, screen } from '@testing-library/react';
// import App from './App';
import GameView from './game_view';

test('renders learn react link', () => {
  render(<GameView />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
