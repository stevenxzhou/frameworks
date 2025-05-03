import { render, screen } from '@testing-library/react';
import HelloWorld from './HelloWorld';

describe("Test", ()=> {
  test('renders hello world text', () => {
    render(<HelloWorld />);
    const helloMsg = screen.getByText(/Xingyu's Playground/i);
    expect(helloMsg).toBeInTheDocument();
  });
})

