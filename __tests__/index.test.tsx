import { render, screen } from '@testing-library/react';
import Home from '../pages/index';

describe('Home page', () => {
  it('renders the welcome message', () => {
    render(<Home />);
    
    const heading = screen.getByRole('heading', {
      name: /welcome to the self-hosted builder/i,
    });
    
    expect(heading).toBeInTheDocument();
  });
}); 