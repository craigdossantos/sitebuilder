import { useState } from 'react';
import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import { deploySite } from '../../components/utils/deployment';

export default function BuilderDashboard() {
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentStatus, setDeploymentStatus] = useState<'idle' | 'deploying' | 'success' | 'error'>('idle');

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

  return (
    <div className={styles.container}>
      <Head>
        <title>Builder Dashboard | Self-Hosted Builder</title>
        <meta name="description" content="Builder dashboard for the self-hosted website builder" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Builder Dashboard
        </h1>

        <div className="mt-8 w-full max-w-4xl">
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
        </div>
      </main>
    </div>
  );
} 