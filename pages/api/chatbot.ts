import type { NextApiRequest, NextApiResponse } from 'next';

type ChatbotRequest = {
  message: string;
  initialPrompt?: string;
  context?: string;
};

type ChatbotResponse = {
  response: string;
};

/**
 * Simple chatbot API endpoint
 * In a real application, this would call OpenAI's API
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChatbotResponse | { error: string }>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, initialPrompt, context } = req.body as ChatbotRequest;

    // Validate the request
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    // In a real application, this would call OpenAI's API with the context
    // For now, we'll just return a dummy response
    
    // Log the context for debugging (would be removed in production)
    console.log('Received context:', context);
    console.log('Received initial prompt:', initialPrompt);
    
    // Simulate a delay to make it feel more realistic
    await new Promise(resolve => setTimeout(resolve, 500));

    // Generate a simple response based on the message
    let response: string;

    if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
      response = 'Hello! How can I help you today?';
    } else if (message.toLowerCase().includes('help')) {
      response = 'I\'m here to help! What do you need assistance with?';
    } else if (message.toLowerCase().includes('bye') || message.toLowerCase().includes('goodbye')) {
      response = 'Goodbye! Have a great day!';
    } else if (context && message.toLowerCase().includes('context')) {
      response = `I see you're asking about the context. Here's what I know: "${context.substring(0, 100)}${context.length > 100 ? '...' : ''}"`;
    } else {
      response = `I received your message: "${message}". This is a dummy response from the chatbot. In a real application, this would be a response from OpenAI's API that considers the page context.`;
    }

    // If there's an initial prompt, acknowledge it
    if (initialPrompt && initialPrompt.trim() !== '') {
      response += ` (Using your initial prompt: "${initialPrompt.substring(0, 30)}${initialPrompt.length > 30 ? '...' : ''}")`;
    }

    // Return the response
    return res.status(200).json({ response });
  } catch (error) {
    console.error('Error in chatbot API:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
} 