import { render, screen } from '@testing-library/react';
import TestComponent from '../components/TestComponent';

describe('TestComponent', () => {
  it('renders the message', () => {
    render(<TestComponent message="Hello, testing!" />);

    const messageElement = screen.getByText('Hello, testing!');

    expect(messageElement).toBeInTheDocument();
  });
});
