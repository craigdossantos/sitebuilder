import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../components/Layout';
import { generateSEOData } from '../utils/seo';

// Define a type for search results
interface SearchResult {
  slug: string;
  title: string;
  excerpt: string;
  score: number;
}

// Mock page data - in a real app, this would come from a database or API
const mockPages = [
  {
    slug: 'home',
    title: 'Home Page',
    content: 'Welcome to our site builder. Create beautiful pages with our easy-to-use editor.'
  },
  {
    slug: 'about',
    title: 'About Us',
    content: 'We are a team dedicated to making website building accessible to everyone.'
  },
  {
    slug: 'features',
    title: 'Features',
    content: 'Our site builder includes blocks for text, images, videos, and even AI chatbots.'
  },
  {
    slug: 'pricing',
    title: 'Pricing Plans',
    content: 'Choose from our flexible pricing plans to suit your needs.'
  },
  {
    slug: 'contact',
    title: 'Contact Us',
    content: 'Get in touch with our support team for any questions or feedback.'
  }
];

export default function SearchPage() {
  const router = useRouter();
  const { q } = router.query;
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Initialize search query from URL parameter
  useEffect(() => {
    if (q && typeof q === 'string') {
      setSearchQuery(q);
      performSearch(q);
    }
  }, [q]);

  // Function to perform the search
  const performSearch = (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsSearching(true);

    // Simple search algorithm that checks for substring matches
    // and assigns a score based on where the match is found
    const searchResults = mockPages
      .map(page => {
        const titleLower = page.title.toLowerCase();
        const contentLower = page.content.toLowerCase();
        const queryLower = query.toLowerCase();
        
        // Calculate score: higher if match is in title
        let score = 0;
        if (titleLower.includes(queryLower)) {
          score += 10;
        }
        if (contentLower.includes(queryLower)) {
          score += 5;
        }
        
        // Create excerpt with context around the match
        let excerpt = '';
        if (contentLower.includes(queryLower)) {
          const index = contentLower.indexOf(queryLower);
          const start = Math.max(0, index - 20);
          const end = Math.min(contentLower.length, index + queryLower.length + 20);
          excerpt = '...' + page.content.substring(start, end) + '...';
        } else {
          excerpt = page.content.substring(0, 100) + '...';
        }
        
        return {
          slug: page.slug,
          title: page.title,
          excerpt,
          score
        };
      })
      .filter(result => result.score > 0)
      .sort((a, b) => b.score - a.score);

    setResults(searchResults);
    setIsSearching(false);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update URL with search query
    router.push({
      pathname: '/search',
      query: { q: searchQuery }
    }, undefined, { shallow: true });
    
    performSearch(searchQuery);
  };

  // Generate SEO data
  const seoData = generateSEOData(`Search results for ${searchQuery}`);

  return (
    <Layout seoData={seoData}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Search</h1>
        
        <form onSubmit={handleSubmit} className="mb-8" data-testid="search-form">
          <div className="flex">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow p-3 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter keywords to search..."
              data-testid="search-input"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-r"
              data-testid="search-button"
            >
              Search
            </button>
          </div>
        </form>
        
        <div className="search-results" data-testid="search-results">
          {isSearching ? (
            <p className="text-gray-500">Searching...</p>
          ) : searchQuery && results.length === 0 ? (
            <p className="text-gray-500">No results found for "{searchQuery}"</p>
          ) : results.length > 0 ? (
            <div>
              <h2 className="text-xl font-semibold mb-4">
                {results.length} result{results.length !== 1 ? 's' : ''} for "{searchQuery}"
              </h2>
              <ul className="space-y-6">
                {results.map((result) => (
                  <li key={result.slug} className="border-b pb-4" data-testid={`search-result-${result.slug}`}>
                    <Link href={`/${result.slug}`}>
                      <a className="text-lg font-medium text-blue-600 hover:underline">
                        {result.title}
                      </a>
                    </Link>
                    <p className="text-gray-600 mt-1">{result.excerpt}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </Layout>
  );
} 