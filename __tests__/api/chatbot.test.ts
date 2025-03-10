import { createMocks } from 'node-mocks-http';
import type { NextApiRequest, NextApiResponse } from 'next';
import handler from '../../pages/api/chatbot';

// Mock the fetch function for OpenAI API calls
global.fetch = jest.fn();

// Save the original environment and mock it
const originalEnv = process.env;

describe('Chatbot API Endpoint', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    // Reset environment variables before each test
    process.env = { ...originalEnv };
    delete process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  });

  afterAll(() => {
    // Restore original environment
    process.env = originalEnv;
  });

  it('returns 405 for non-POST requests', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET',
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(405);
    expect(JSON.parse(res._getData())).toEqual({ error: 'Method not allowed' });
  });

  it('returns 400 if message is missing', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      body: {},
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(JSON.parse(res._getData())).toEqual({ error: 'Message is required' });
  });

  it('returns a mock response when OpenAI API key is not available', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      body: { message: 'Hello' },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    const data = JSON.parse(res._getData());
    expect(data).toHaveProperty('response');
    expect(data.response).toBe('Hello! How can I help you today?');
    expect(fetch).not.toHaveBeenCalled();
  });

  it('calls OpenAI API when API key is available', async () => {
    // Mock the OpenAI API key
    process.env.NEXT_PUBLIC_OPENAI_API_KEY = 'test-api-key';

    // Mock the fetch response
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: 'Response from OpenAI' } }]
      })
    });

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      body: { message: 'Hello' },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    const data = JSON.parse(res._getData());
    expect(data.response).toBe('Response from OpenAI');
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      'https://api.openai.com/v1/chat/completions',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Authorization': 'Bearer test-api-key'
        })
      })
    );
  });

  it('falls back to mock response when OpenAI API call fails', async () => {
    // Mock the OpenAI API key
    process.env.NEXT_PUBLIC_OPENAI_API_KEY = 'test-api-key';

    // Mock the fetch response to fail
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'API error' })
    });

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      body: { message: 'Hello' },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    const data = JSON.parse(res._getData());
    expect(data.response).toContain('Hello! How can I help you today?');
    expect(data.response).toContain('OpenAI API call failed');
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('includes context in the OpenAI API call', async () => {
    // Mock the OpenAI API key
    process.env.NEXT_PUBLIC_OPENAI_API_KEY = 'test-api-key';

    // Mock the fetch response
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: 'Response with context' } }]
      })
    });

    const mockContext = 'This is the page content that provides context for the chatbot.';
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      body: { 
        message: 'Tell me about the context',
        context: mockContext
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(fetch).toHaveBeenCalledTimes(1);
    
    // Check that the context was included in the API call
    const fetchCall = (fetch as jest.Mock).mock.calls[0];
    const requestBody = JSON.parse(fetchCall[1].body);
    expect(requestBody.messages[0].content).toContain(mockContext);
  });

  it('includes initial prompt in the OpenAI API call', async () => {
    // Mock the OpenAI API key
    process.env.NEXT_PUBLIC_OPENAI_API_KEY = 'test-api-key';

    // Mock the fetch response
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: 'Response with initial prompt' } }]
      })
    });

    const mockInitialPrompt = 'You are a helpful assistant.';
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      body: { 
        message: 'Hello',
        initialPrompt: mockInitialPrompt
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(fetch).toHaveBeenCalledTimes(1);
    
    // Check that the initial prompt was included in the API call
    const fetchCall = (fetch as jest.Mock).mock.calls[0];
    const requestBody = JSON.parse(fetchCall[1].body);
    expect(requestBody.messages[0].content).toContain(mockInitialPrompt);
  });

  // Test mock responses when API key is not available
  it('returns a greeting mock response for hello messages', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      body: { message: 'Hello' },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    const data = JSON.parse(res._getData());
    expect(data.response).toBe('Hello! How can I help you today?');
  });

  it('returns a help mock response for help messages', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      body: { message: 'I need help' },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    const data = JSON.parse(res._getData());
    expect(data.response).toBe('I\'m here to help! What do you need assistance with?');
  });

  it('returns a goodbye mock response for goodbye messages', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      body: { message: 'Goodbye' },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    const data = JSON.parse(res._getData());
    expect(data.response).toBe('Goodbye! Have a great day!');
  });

  it('returns a generic mock response for other messages', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      body: { message: 'What is the weather like?' },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    const data = JSON.parse(res._getData());
    expect(data.response).toContain('I received your message: "What is the weather like?"');
    expect(data.response).toContain('mock response');
  });
}); 