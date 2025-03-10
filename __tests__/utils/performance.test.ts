import { debounce, memoize, throttle } from '../../utils/performance';

// Mock timers for testing time-based functions
jest.useFakeTimers();

describe('Performance Utilities', () => {
  describe('debounce', () => {
    it('should only call the function after the specified delay', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 1000);
      
      // Call the debounced function
      debouncedFn();
      
      // Function should not be called immediately
      expect(mockFn).not.toHaveBeenCalled();
      
      // Fast-forward time
      jest.advanceTimersByTime(1000);
      
      // Function should be called once
      expect(mockFn).toHaveBeenCalledTimes(1);
    });
    
    it('should reset the timer on subsequent calls', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 1000);
      
      // Call the debounced function
      debouncedFn();
      
      // Advance time partially
      jest.advanceTimersByTime(500);
      
      // Call again
      debouncedFn();
      
      // Advance time to just after the first call would have executed
      jest.advanceTimersByTime(500);
      
      // Function should not have been called yet
      expect(mockFn).not.toHaveBeenCalled();
      
      // Advance time to when the second call should execute
      jest.advanceTimersByTime(500);
      
      // Function should be called once
      expect(mockFn).toHaveBeenCalledTimes(1);
    });
    
    it('should pass arguments to the original function', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 1000);
      
      // Call with arguments
      debouncedFn('test', 123);
      
      // Fast-forward time
      jest.advanceTimersByTime(1000);
      
      // Check arguments
      expect(mockFn).toHaveBeenCalledWith('test', 123);
    });
  });
  
  describe('memoize', () => {
    it('should cache results based on arguments', () => {
      const mockFn = jest.fn((a: number, b: number) => a + b);
      const memoizedFn = memoize(mockFn);
      
      // First call
      expect(memoizedFn(1, 2)).toBe(3);
      expect(mockFn).toHaveBeenCalledTimes(1);
      
      // Same arguments should use cached result
      expect(memoizedFn(1, 2)).toBe(3);
      expect(mockFn).toHaveBeenCalledTimes(1);
      
      // Different arguments should call the function again
      expect(memoizedFn(2, 3)).toBe(5);
      expect(mockFn).toHaveBeenCalledTimes(2);
    });
    
    it('should handle complex arguments', () => {
      const mockFn = jest.fn((obj: { a: number, b: string }) => `${obj.a}-${obj.b}`);
      const memoizedFn = memoize(mockFn);
      
      // First call
      expect(memoizedFn({ a: 1, b: 'test' })).toBe('1-test');
      expect(mockFn).toHaveBeenCalledTimes(1);
      
      // Same arguments (different object but same values)
      expect(memoizedFn({ a: 1, b: 'test' })).toBe('1-test');
      expect(mockFn).toHaveBeenCalledTimes(1);
      
      // Different arguments
      expect(memoizedFn({ a: 2, b: 'test' })).toBe('2-test');
      expect(mockFn).toHaveBeenCalledTimes(2);
    });
  });
  
  describe('throttle', () => {
    it('should only allow one call within the specified time limit', () => {
      const mockFn = jest.fn();
      const throttledFn = throttle(mockFn, 1000);
      
      // First call
      throttledFn();
      expect(mockFn).toHaveBeenCalledTimes(1);
      
      // Call again immediately
      throttledFn();
      expect(mockFn).toHaveBeenCalledTimes(1); // Still only called once
      
      // Advance time
      jest.advanceTimersByTime(1000);
      
      // Call again after time has passed
      throttledFn();
      expect(mockFn).toHaveBeenCalledTimes(2); // Now called twice
    });
    
    it('should pass arguments to the original function', () => {
      const mockFn = jest.fn();
      const throttledFn = throttle(mockFn, 1000);
      
      // Call with arguments
      throttledFn('test', 123);
      
      // Check arguments
      expect(mockFn).toHaveBeenCalledWith('test', 123);
    });
  });
}); 