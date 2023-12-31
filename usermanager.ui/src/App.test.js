import { render, screen } from '@testing-library/react';
import App from './App';

test('renders table with column Name', () => {
  render(<App />);
  const linkElement = screen.getByText(/name/i);
  expect(linkElement).toBeInTheDocument();
});
