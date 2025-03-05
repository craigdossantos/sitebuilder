import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BuilderDashboard from '../pages/builder/index';
import { deploySite } from '../components/utils/deployment';
import '@testing-library/jest-dom';

// Mock the deployment function
jest.mock('../components/utils/deployment', () => ({
  deploySite: jest.fn(() => Promise.resolve()),
}));

describe('Builder Dashboard page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the builder dashboard heading', () => {
    render(<BuilderDashboard />);
    
    const heading = screen.getByRole('heading', {
      name: /builder dashboard/i,
    });
    
    expect(heading).toBeInTheDocument();
  });

  it('renders a deploy button', () => {
    render(<BuilderDashboard />);
    
    const deployButton = screen.getByTestId('deploy-button');
    
    expect(deployButton).toBeInTheDocument();
    expect(deployButton).toHaveTextContent('Deploy Site');
  });

  it('calls deploySite function when deploy button is clicked', async () => {
    render(<BuilderDashboard />);
    
    const deployButton = screen.getByTestId('deploy-button');
    
    // Click the deploy button
    fireEvent.click(deployButton);
    
    // Check if the deploySite function was called
    expect(deploySite).toHaveBeenCalled();
    
    // Check if the button text changes to "Deploying..."
    expect(deployButton).toHaveTextContent('Deploying...');
    
    // Wait for the deployment to complete
    await waitFor(() => {
      expect(deployButton).toHaveTextContent('Deploy Site');
    });
    
    // Check if the success message is displayed
    expect(screen.getByText(/Deployment successful/i)).toBeInTheDocument();
  });
}); 