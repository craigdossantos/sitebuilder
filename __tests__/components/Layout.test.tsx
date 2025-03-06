import React, { act } from 'react';
import { render, screen } from '@testing-library/react';
import Layout from '../../components/Layout';
import '@testing-library/jest-dom';

// Mock next/link
jest.mock('next/link', () => {
  return ({ children }: { children: React.ReactNode }) => {
    return children;
  };
});

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

// Mock Head component
let headTags: React.ReactElement[] = [];
jest.mock('next/head', () => {
  return {
    __esModule: true,
    default: ({ children }: { children: React.ReactElement[] }) => {
      headTags = children;
      return null;
    },
  };
});

describe('Layout', () => {
  beforeEach(() => {
    headTags = [];
    localStorageMock.clear();
    jest.clearAllMocks();
  });

  it('renders children content', () => {
    render(
      <Layout>
        <div data-testid="test-content">Test Content</div>
      </Layout>
    );

    expect(screen.getByTestId('test-content')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders the navigation menu', () => {
    const navItems = [
      { title: 'Home', link: '/' },
      { title: 'About', link: '/about' },
      { title: 'Contact', link: '/contact' },
    ];

    render(
      <Layout navigation={navItems}>
        <div>Content</div>
      </Layout>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByText('Builder')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  it('loads navigation from localStorage when no navigation is provided', () => {
    // Set up localStorage with navigation items
    const savedNavItems = [
      { title: 'Saved Home', link: '/' },
      { title: 'Saved About', link: '/about' },
    ];
    localStorageMock.setItem('siteNavigation', JSON.stringify(savedNavItems));

    render(
      <Layout>
        <div>Content</div>
      </Layout>
    );

    // Wait for useEffect to run
    act(() => {
      // Force a re-render
    });

    expect(screen.getByText('Saved Home')).toBeInTheDocument();
    expect(screen.getByText('Saved About')).toBeInTheDocument();
    expect(localStorageMock.getItem).toHaveBeenCalledWith('siteNavigation');
  });

  it('renders SEO meta tags when provided', () => {
    const seoData = {
      title: 'Test Page',
      description: 'This is a test page description',
    };

    render(
      <Layout seoData={seoData}>
        <div>Content</div>
      </Layout>
    );

    // Check if title and description meta tags are in the headTags array
    const titleTag = headTags.find(
      (tag) => tag.type === 'title' && tag.props.children === 'Test Page'
    );
    const metaTag = headTags.find(
      (tag) => 
        tag.type === 'meta' && 
        tag.props.name === 'description' && 
        tag.props.content === 'This is a test page description'
    );

    expect(titleTag).toBeTruthy();
    expect(metaTag).toBeTruthy();
  });

  it('renders default SEO when no data provided', () => {
    render(
      <Layout>
        <div>Content</div>
      </Layout>
    );

    // Check if default title is in the headTags array
    const titleTag = headTags.find(
      (tag) => tag.type === 'title' && tag.props.children === 'Site Builder'
    );
    
    expect(titleTag).toBeTruthy();
  });

  it('renders the footer with copyright information', () => {
    render(
      <Layout>
        <div>Content</div>
      </Layout>
    );

    const currentYear = new Date().getFullYear();
    expect(screen.getByText(`© ${currentYear} Site Builder. All rights reserved.`)).toBeInTheDocument();
  });
}); 