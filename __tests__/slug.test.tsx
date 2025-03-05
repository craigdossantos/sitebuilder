import { render, screen } from '@testing-library/react';
import DynamicPage from '../pages/[slug]';
import { useRouter } from 'next/router';

// Mock the Next.js router
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Dynamic Slug page', () => {
  it('renders the slug in the heading', () => {
    // Setup the mock router
    const mockRouter = {
      query: { slug: 'test-page' },
    };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    
    render(<DynamicPage />);
    
    const heading = screen.getByRole('heading', {
      name: /test-page/i,
    });
    
    expect(heading).toBeInTheDocument();
  });
}); 