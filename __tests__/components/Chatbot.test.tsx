import React, { act } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Chatbot from '../../components/Chatbot';
import '@testing-library/jest-dom';

// Mock the fetch function
global.fetch = jest.fn();

describe('Chatbot Component', () => {
  const mockPageContext = 'This is the page content that provides context for the chatbot.';
  const mockInitialPrompt = 'You are a helpful assistant.';

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock successful fetch response
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ response: 'Hello from the chatbot!' }),
    });
  });

  it('renders the chatbot with input and send button', () => {
    render(<Chatbot />);
    
    // Check if the chatbot container exists
    expect(screen.getByTestId('chatbot')).toBeInTheDocument();
    
    // Check if the input field exists
    const inputField = screen.getByTestId('chat-input');
    expect(inputField).toBeInTheDocument();
    expect(inputField).toHaveAttribute('placeholder', 'Type your message here...');
    
    // Check if the send button exists
    const sendButton = screen.getByTestId('chat-submit');
    expect(sendButton).toBeInTheDocument();
    expect(sendButton).toHaveTextContent('Send');
    
    // Initially, the button should be disabled because the input is empty
    expect(sendButton).toBeDisabled();
  });

  it('enables the send button when text is entered', () => {
    render(<Chatbot />);
    
    const inputField = screen.getByTestId('chat-input');
    const sendButton = screen.getByTestId('chat-submit');
    
    // Initially, the button should be disabled
    expect(sendButton).toBeDisabled();
    
    // Enter text in the input field
    fireEvent.change(inputField, { target: { value: 'Hello' } });
    
    // Now the button should be enabled
    expect(sendButton).not.toBeDisabled();
  });

  it('calls the API endpoint when send button is clicked', async () => {
    render(<Chatbot />);
    
    const inputField = screen.getByTestId('chat-input');
    const sendButton = screen.getByTestId('chat-submit');
    
    // Enter text in the input field
    fireEvent.change(inputField, { target: { value: 'Hello' } });
    
    // Click the send button
    fireEvent.click(sendButton);
    
    // Check if fetch was called with the correct arguments
    expect(global.fetch).toHaveBeenCalledWith('/api/chatbot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        message: 'Hello',
        initialPrompt: '',
        context: '' 
      }),
    });
    
    // Check if the user message is displayed
    expect(screen.getByTestId('user-message-0')).toBeInTheDocument();
    expect(screen.getByTestId('user-message-0')).toHaveTextContent('Hello');
    
    // Check if the loading indicator is displayed
    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();
    
    // Wait for the response to be displayed
    await waitFor(() => {
      expect(screen.getByTestId('assistant-message-1')).toBeInTheDocument();
    });
    
    // Check if the assistant message is displayed
    expect(screen.getByTestId('assistant-message-1')).toHaveTextContent('Hello from the chatbot!');
    
    // Check if the loading indicator is removed
    expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument();
    
    // Check if the input field is cleared
    expect(inputField).toHaveValue('');
  });

  it('includes page context in the API request when provided', async () => {
    render(<Chatbot pageContext={mockPageContext} initialPrompt={mockInitialPrompt} />);
    
    const inputField = screen.getByTestId('chat-input');
    const sendButton = screen.getByTestId('chat-submit');
    
    // Enter text in the input field
    fireEvent.change(inputField, { target: { value: 'Tell me about this page' } });
    
    // Click the send button
    fireEvent.click(sendButton);
    
    // Check if fetch was called with the correct arguments including page context
    expect(global.fetch).toHaveBeenCalledWith('/api/chatbot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        message: 'Tell me about this page',
        initialPrompt: mockInitialPrompt,
        context: mockPageContext 
      }),
    });
  });

  it('handles API errors gracefully', async () => {
    // Mock a failed fetch response
    (global.fetch as jest.Mock).mockRejectedValue(new Error('API error'));
    
    render(<Chatbot />);
    
    const inputField = screen.getByTestId('chat-input');
    const sendButton = screen.getByTestId('chat-submit');
    
    // Enter text in the input field
    fireEvent.change(inputField, { target: { value: 'Hello' } });
    
    // Click the send button
    fireEvent.click(sendButton);
    
    // Wait for the error message to be displayed
    await waitFor(() => {
      expect(screen.getByTestId('assistant-message-1')).toBeInTheDocument();
    });
    
    // Check if the error message is displayed
    expect(screen.getByTestId('assistant-message-1')).toHaveTextContent('Sorry, I encountered an error. Please try again.');
  });

  it('allows custom placeholder text', () => {
    render(<Chatbot placeholder="Ask me anything..." />);
    
    const inputField = screen.getByTestId('chat-input');
    expect(inputField).toHaveAttribute('placeholder', 'Ask me anything...');
  });
}); 