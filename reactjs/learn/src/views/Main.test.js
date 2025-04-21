import { render, screen } from '@testing-library/react';
import Main from './Main';

test('renders learn react link', () => {
  render(<Main />);
  const linkElement = screen.getByText(/Change Theme/i);
  expect(linkElement).toBeInTheDocument();
});
