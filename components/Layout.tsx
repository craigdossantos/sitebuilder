import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export interface NavigationItem {
  title: string;
  link: string;
}

interface LayoutProps {
  children: React.ReactNode;
  navigation?: NavigationItem[];
  seoData?: {
    title?: string;
    description?: string;
  };
}

const Layout: React.FC<LayoutProps> = ({ children, navigation = [], seoData = {} }) => {
  const title = seoData.title || 'Site Builder';
  const [navItems, setNavItems] = useState<NavigationItem[]>(navigation);
  
  // Load navigation from localStorage on initial mount only
  useEffect(() => {
    // Only load from localStorage if no navigation is provided
    if (navigation.length === 0) {
      const savedNavigation = localStorage.getItem('siteNavigation');
      if (savedNavigation) {
        try {
          const parsedNavigation = JSON.parse(savedNavigation);
          setNavItems(parsedNavigation);
        } catch (error) {
          console.error('Error parsing saved navigation:', error);
        }
      }
    }
  }, []); // Empty dependency array - only run on mount
  
  // Update navItems when navigation prop changes
  useEffect(() => {
    if (navigation.length > 0) {
      setNavItems(navigation);
    }
  }, [navigation]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>{title}</title>
        {seoData.description && <meta name="description" content={seoData.description} />}
      </Head>

      <nav className="bg-gray-800 text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">
              Site Builder
            </Link>
            <ul className="flex space-x-6">
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link href={item.link} className="hover:text-gray-300">
                    {item.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/builder" className="hover:text-gray-300">
                  Builder
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-gray-300">
                  Search
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          © {new Date().getFullYear()} Site Builder. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout; 