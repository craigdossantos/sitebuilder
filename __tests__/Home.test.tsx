import { render, screen } from '@testing-library/react';
import Home from '../app/page';

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />);

    // This assumes there's a heading in your Home component
    // You might need to adjust this based on your actual component
    const heading = screen.getByRole('heading', { level: 1 });

    expect(heading).toBeInTheDocument();
  });
});
