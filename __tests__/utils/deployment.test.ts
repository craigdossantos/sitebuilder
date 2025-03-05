import { deploySite } from '../../components/utils/deployment';

describe('Deployment Utilities', () => {
  let consoleLogSpy: jest.SpyInstance;
  
  beforeEach(() => {
    // Mock console.log to avoid cluttering test output
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    
    // Mock setTimeout to make tests run faster
    jest.useFakeTimers();
  });
  
  afterEach(() => {
    consoleLogSpy.mockRestore();
    jest.useRealTimers();
  });
  
  it('logs deployment start and success messages', async () => {
    // Start the deployment process
    const deploymentPromise = deploySite();
    
    // Check if the start message was logged
    expect(consoleLogSpy).toHaveBeenCalledWith('Deployment started...');
    
    // Fast-forward time to complete the deployment
    jest.advanceTimersByTime(1500);
    
    // Wait for the deployment to complete
    await deploymentPromise;
    
    // Check if the success message was logged
    expect(consoleLogSpy).toHaveBeenCalledWith('Deployment successful!');
  });
}); 