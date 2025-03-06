import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';
import SearchPage from '../pages/search';
import '@testing-library/jest-dom';

// Mock the next/router
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

// Mock the Layout component
jest.mock('../components/Layout', () => {
  return function MockLayout({ children }: { children: React.ReactNode }) {
    return <div data-testid="mock-layout">{children}</div>;
  };
});

describe('Search Page', () => {
  const mockPush = jest.fn();
  
  beforeEach(() => {
    // Setup router mock
    (useRouter as jest.Mock).mockReturnValue({
      query: {},
      push: mockPush,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the search page with form elements', () => {
    render(<SearchPage />);
    
    // Check if the search heading is displayed
    expect(screen.getByRole('heading', { name: /search/i })).toBeInTheDocument();
    
    // Check if the search form exists
    expect(screen.getByTestId('search-form')).toBeInTheDocument();
    
    // Check if the search input exists
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    
    // Check if the search button exists
    expect(screen.getByTestId('search-button')).toBeInTheDocument();
    expect(screen.getByTestId('search-button')).toHaveTextContent('Search');
  });

  it('updates search query when typing in the input', () => {
    render(<SearchPage />);
    
    const searchInput = screen.getByTestId('search-input');
    
    // Type in the search input
    fireEvent.change(searchInput, { target: { value: 'test query' } });
    
    // Check if the input value was updated
    expect(searchInput).toHaveValue('test query');
  });

  it('performs search when form is submitted', async () => {
    render(<SearchPage />);
    
    const searchInput = screen.getByTestId('search-input');
    const searchForm = screen.getByTestId('search-form');
    
    // Type in the search input
    fireEvent.change(searchInput, { target: { value: 'features' } });
    
    // Submit the form
    fireEvent.submit(searchForm);
    
    // Check if router.push was called with the correct query
    expect(mockPush).toHaveBeenCalledWith(
      { pathname: '/search', query: { q: 'features' } },
      undefined,
      { shallow: true }
    );
    
    // Wait for search results to appear
    await waitFor(() => {
      // Check if we have search results
      expect(screen.getByTestId('search-results')).toBeInTheDocument();
      
      // Check if the Features page is in the results
      expect(screen.getByTestId('search-result-features')).toBeInTheDocument();
      expect(screen.getByText(/Features/)).toBeInTheDocument();
    });
  });

  it('shows "No results found" message for queries with no matches', async () => {
    render(<SearchPage />);
    
    const searchInput = screen.getByTestId('search-input');
    const searchForm = screen.getByTestId('search-form');
    
    // Type in the search input with a query that won't match anything
    fireEvent.change(searchInput, { target: { value: 'xyznonexistent' } });
    
    // Submit the form
    fireEvent.submit(searchForm);
    
    // Wait for no results message to appear
    await waitFor(() => {
      expect(screen.getByText(/No results found for "xyznonexistent"/)).toBeInTheDocument();
    });
  });

  it('initializes search from URL query parameter', async () => {
    // Setup router mock with query parameter
    (useRouter as jest.Mock).mockReturnValue({
      query: { q: 'about' },
      push: mockPush,
    });
    
    render(<SearchPage />);
    
    // Wait for search results to appear
    await waitFor(() => {
      // Check if the search input has the query value
      expect(screen.getByTestId('search-input')).toHaveValue('about');
      
      // Check if the About page is in the results
      expect(screen.getByTestId('search-result-about')).toBeInTheDocument();
      expect(screen.getByText(/About Us/)).toBeInTheDocument();
    });
  });
}); 