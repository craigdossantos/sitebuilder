import { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../../components/Layout';
import { NavigationItem } from '../../components/Layout';
import { deploySite } from '../../components/utils/deployment';

export default function BuilderDashboard() {
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentStatus, setDeploymentStatus] = useState<'idle' | 'deploying' | 'success' | 'error'>('idle');
  const [navigation, setNavigation] = useState<NavigationItem[]>([]);
  const [newNavItem, setNewNavItem] = useState<NavigationItem>({ title: '', link: '' });

  // Load navigation items from localStorage on component mount
  useEffect(() => {
    const savedNavigation = localStorage.getItem('siteNavigation');
    if (savedNavigation) {
      try {
        const parsedNavigation = JSON.parse(savedNavigation);
        setNavigation(parsedNavigation);
      } catch (error) {
        console.error('Error parsing saved navigation:', error);
      }
    }
  }, []); // Empty dependency array - only run on mount

  // Save navigation items to localStorage whenever they change
  const saveNavigation = (items: NavigationItem[]) => {
    localStorage.setItem('siteNavigation', JSON.stringify(items));
  };

  const handleDeploy = async () => {
    try {
      setIsDeploying(true);
      setDeploymentStatus('deploying');
      
      await deploySite();
      
      setDeploymentStatus('success');
    } catch (error) {
      console.error('Deployment failed:', error);
      setDeploymentStatus('error');
    } finally {
      setIsDeploying(false);
    }
  };

  const handleAddNavItem = () => {
    if (newNavItem.title && newNavItem.link) {
      const updatedNavigation = [...navigation, { ...newNavItem }];
      setNavigation(updatedNavigation);
      saveNavigation(updatedNavigation);
      setNewNavItem({ title: '', link: '' });
    }
  };

  const handleRemoveNavItem = (index: number) => {
    const updatedNavigation = navigation.filter((_, i) => i !== index);
    setNavigation(updatedNavigation);
    saveNavigation(updatedNavigation);
  };

  return (
    <Layout navigation={navigation}>
      <div className="container mx-auto px-4 py-8">
        <Head>
          <title>Builder Dashboard | Self-Hosted Builder</title>
          <meta name="description" content="Builder dashboard for the self-hosted website builder" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <h1 className="text-3xl font-bold mb-8">
            Builder Dashboard
          </h1>

          {/* Navigation Editor */}
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Navigation Menu</h2>
            
            <div className="space-y-4">
              {/* Current Navigation Items */}
              {navigation.map((item, index) => (
                <div key={index} className="flex items-center space-x-4 p-2 bg-gray-50 rounded">
                  <span className="flex-grow">
                    {item.title} → {item.link}
                  </span>
                  <button
                    onClick={() => handleRemoveNavItem(index)}
                    className="text-red-500 hover:text-red-700"
                    data-testid={`remove-nav-item-${index}`}
                  >
                    Remove
                  </button>
                </div>
              ))}

              {/* Add New Navigation Item */}
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={newNavItem.title}
                  onChange={(e) => setNewNavItem({ ...newNavItem, title: e.target.value })}
                  placeholder="Menu Title"
                  className="flex-1 p-2 border rounded"
                  data-testid="nav-title-input"
                />
                <input
                  type="text"
                  value={newNavItem.link}
                  onChange={(e) => setNewNavItem({ ...newNavItem, link: e.target.value })}
                  placeholder="Page Link (e.g., /about)"
                  className="flex-1 p-2 border rounded"
                  data-testid="nav-link-input"
                />
                <button
                  onClick={handleAddNavItem}
                  disabled={!newNavItem.title || !newNavItem.link}
                  className={`px-4 py-2 rounded ${
                    !newNavItem.title || !newNavItem.link
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                  data-testid="add-nav-item"
                >
                  Add Menu Item
                </button>
              </div>
            </div>
          </div>

          {/* Deployment Section */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Site Management</h2>
            
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600">
                  Deploy your site to make your changes live.
                </p>
                {deploymentStatus === 'success' && (
                  <p className="text-green-600 mt-2">
                    Deployment successful! Your site is now live.
                  </p>
                )}
                {deploymentStatus === 'error' && (
                  <p className="text-red-600 mt-2">
                    Deployment failed. Please try again.
                  </p>
                )}
              </div>
              
              <button
                onClick={handleDeploy}
                disabled={isDeploying}
                className={`px-4 py-2 rounded ${
                  isDeploying 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
                data-testid="deploy-button"
              >
                {isDeploying ? (
                  <span>Deploying...</span>
                ) : (
                  <span>Deploy Site</span>
                )}
              </button>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
} 