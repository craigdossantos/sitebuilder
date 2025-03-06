import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BuilderDashboard from '../../../pages/builder/index';
import { deploySite } from '../../../components/utils/deployment';
import '@testing-library/jest-dom';

// Mock the Layout component
jest.mock('../../../components/Layout', () => {
  return function MockLayout({ children, navigation }: { children: React.ReactNode, navigation: any[] }) {
    return <div data-testid="mock-layout">{children}</div>;
  };
});

// Mock deployment function
jest.mock('../../../components/utils/deployment', () => ({
  deploySite: jest.fn(() => Promise.resolve()),
}));

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    clear: jest.fn(() => {
      store = {};
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('Builder Dashboard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.clear();
  });

  it('renders the navigation editor', () => {
    render(<BuilderDashboard />);
    
    expect(screen.getByText('Navigation Menu')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Menu Title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Page Link (e.g., /about)')).toBeInTheDocument();
  });

  it('loads navigation items from localStorage on mount', () => {
    // Set up localStorage with navigation items
    const savedNavItems = [
      { title: 'Home', link: '/' },
      { title: 'About', link: '/about' },
    ];
    localStorageMock.setItem('siteNavigation', JSON.stringify(savedNavItems));
    
    render(<BuilderDashboard />);
    
    // Check if localStorage was accessed
    expect(localStorageMock.getItem).toHaveBeenCalledWith('siteNavigation');
    
    // Check if the saved navigation items are displayed
    expect(screen.getByText('Home → /')).toBeInTheDocument();
    expect(screen.getByText('About → /about')).toBeInTheDocument();
  });

  it('adds a new navigation item', () => {
    render(<BuilderDashboard />);
    
    // Fill in the form
    fireEvent.change(screen.getByPlaceholderText('Menu Title'), { target: { value: 'Contact' } });
    fireEvent.change(screen.getByPlaceholderText('Page Link (e.g., /about)'), { target: { value: '/contact' } });
    
    // Click the add button
    fireEvent.click(screen.getByTestId('add-nav-item'));
    
    // Check if the new item is displayed
    expect(screen.getByText('Contact → /contact')).toBeInTheDocument();
    
    // Check if localStorage was updated
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'siteNavigation',
      JSON.stringify([{ title: 'Contact', link: '/contact' }])
    );
  });

  it('removes a navigation item', () => {
    // Set up localStorage with navigation items
    const savedNavItems = [
      { title: 'Home', link: '/' },
      { title: 'About', link: '/about' },
    ];
    localStorageMock.setItem('siteNavigation', JSON.stringify(savedNavItems));
    
    render(<BuilderDashboard />);
    
    // Click the remove button for the first item
    fireEvent.click(screen.getByTestId('remove-nav-item-0'));
    
    // Check if the item was removed
    expect(screen.queryByText('Home → /')).not.toBeInTheDocument();
    expect(screen.getByText('About → /about')).toBeInTheDocument();
    
    // Check if localStorage was updated
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'siteNavigation',
      JSON.stringify([{ title: 'About', link: '/about' }])
    );
  });

  it('disables the add button when inputs are empty', () => {
    render(<BuilderDashboard />);
    
    const addButton = screen.getByTestId('add-nav-item');
    expect(addButton).toBeDisabled();

    // Fill only title
    fireEvent.change(screen.getByTestId('nav-title-input'), { target: { value: 'About' } });
    expect(addButton).toBeDisabled();

    // Fill only link
    fireEvent.change(screen.getByTestId('nav-title-input'), { target: { value: '' } });
    fireEvent.change(screen.getByTestId('nav-link-input'), { target: { value: '/about' } });
    expect(addButton).toBeDisabled();

    // Fill both
    fireEvent.change(screen.getByTestId('nav-title-input'), { target: { value: 'About' } });
    expect(addButton).not.toBeDisabled();
  });

  it('renders the deployment section', () => {
    render(<BuilderDashboard />);
    
    expect(screen.getByText('Site Management')).toBeInTheDocument();
    expect(screen.getByTestId('deploy-button')).toBeInTheDocument();
  });
}); 