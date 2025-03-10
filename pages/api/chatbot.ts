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
 * Chatbot API endpoint that calls OpenAI's API
 * Uses the NEXT_PUBLIC_OPENAI_API_KEY environment variable
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

    // Check if OpenAI API key is available
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    
    if (!apiKey) {
      console.warn('OpenAI API key not found. Using mock response.');
      return res.status(200).json({ 
        response: getMockResponse(message, initialPrompt, context) 
      });
    }

    try {
      // Call OpenAI API
      const openaiResponse = await callOpenAI(message, initialPrompt, context, apiKey);
      return res.status(200).json({ response: openaiResponse });
    } catch (openaiError) {
      console.error('Error calling OpenAI API:', openaiError);
      // Fallback to mock response if OpenAI call fails
      return res.status(200).json({ 
        response: getMockResponse(message, initialPrompt, context) + ' (Note: OpenAI API call failed, using fallback response)'
      });
    }
  } catch (error) {
    console.error('Error in chatbot API:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * Call OpenAI API with the message, prompt, and context
 */
async function callOpenAI(
  message: string, 
  initialPrompt?: string, 
  context?: string,
  apiKey?: string
): Promise<string> {
  if (!apiKey) {
    throw new Error('OpenAI API key is required');
  }

  // Prepare the system message with context if available
  let systemMessage = 'You are a helpful assistant.';
  if (context) {
    systemMessage += ` The current page content is: "${context}"`;
  }
  if (initialPrompt) {
    systemMessage += ` The user's initial prompt was: "${initialPrompt}"`;
  }

  // Call OpenAI API
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemMessage },
        { role: 'user', content: message }
      ],
      temperature: 0.7,
      max_tokens: 500
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`OpenAI API error: ${JSON.stringify(errorData)}`);
  }

  const data = await response.json();
  return data.choices[0]?.message?.content || 'No response from OpenAI';
}

/**
 * Get a mock response when OpenAI API is not available
 */
function getMockResponse(
  message: string, 
  initialPrompt?: string, 
  context?: string
): string {
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
    response = `I received your message: "${message}". This is a mock response. To get real AI responses, please add your OpenAI API key to the .env.local file.`;
  }

  // If there's an initial prompt, acknowledge it
  if (initialPrompt && initialPrompt.trim() !== '') {
    response += ` (Using your initial prompt: "${initialPrompt.substring(0, 30)}${initialPrompt.length > 30 ? '...' : ''}")`;
  }

  return response;
} 