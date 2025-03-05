import { createMocks } from 'node-mocks-http';
import type { NextApiRequest, NextApiResponse } from 'next';
import handler from '../../pages/api/chatbot';

describe('Chatbot API Endpoint', () => {
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

  it('returns a response for a valid message', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      body: { message: 'Hello' },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    const data = JSON.parse(res._getData());
    expect(data).toHaveProperty('response');
    expect(typeof data.response).toBe('string');
  });

  it('accepts and uses page context in the response', async () => {
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
    const data = JSON.parse(res._getData());
    expect(data.response).toContain(mockContext.substring(0, 20)); // Should include part of the context
  });

  it('accepts and uses initial prompt in the response', async () => {
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
    const data = JSON.parse(res._getData());
    expect(data.response).toContain(mockInitialPrompt.substring(0, 20)); // Should include part of the prompt
  });

  it('returns a greeting response for hello messages', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      body: { message: 'Hello' },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    const data = JSON.parse(res._getData());
    expect(data.response).toBe('Hello! How can I help you today?');
  });

  it('returns a help response for help messages', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      body: { message: 'I need help' },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    const data = JSON.parse(res._getData());
    expect(data.response).toBe('I\'m here to help! What do you need assistance with?');
  });

  it('returns a goodbye response for goodbye messages', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      body: { message: 'Goodbye' },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    const data = JSON.parse(res._getData());
    expect(data.response).toBe('Goodbye! Have a great day!');
  });

  it('returns a generic response for other messages', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      body: { message: 'What is the weather like?' },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    const data = JSON.parse(res._getData());
    expect(data.response).toContain('I received your message: "What is the weather like?"');
  });
}); 