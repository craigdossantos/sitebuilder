import React, { useState } from 'react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatbotProps {
  initialPrompt?: string;
  placeholder?: string;
  pageContext?: string;
}

const Chatbot: React.FC<ChatbotProps> = ({
  initialPrompt = '',
  placeholder = 'Type your message here...',
  pageContext = '',
}) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message to the chat
    const userMessage: ChatMessage = {
      role: 'user',
      content: input,
    };
    
    setMessages([...messages, userMessage]);
    setIsLoading(true);
    setInput('');
    
    try {
      // Call the chatbot API
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: input,
          initialPrompt: initialPrompt,
          context: pageContext 
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to get response from chatbot');
      }
      
      const data = await response.json();
      
      // Add assistant message to the chat
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: data.response,
      };
      
      setMessages(prevMessages => [...prevMessages, assistantMessage]);
    } catch (error) {
      console.error('Error calling chatbot API:', error);
      
      // Add error message to the chat
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
      };
      
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbot-container border rounded-lg p-4 bg-white shadow-sm" data-testid="chatbot">
      {/* Chat messages */}
      <div className="chat-messages mb-4 max-h-80 overflow-y-auto" data-testid="chat-messages">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            No messages yet. Start a conversation!
          </p>
        ) : (
          <div className="space-y-2">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`p-2 rounded ${
                  message.role === 'user'
                    ? 'bg-blue-100 ml-8'
                    : 'bg-gray-100 mr-8'
                }`}
                data-testid={`${message.role}-message-${index}`}
              >
                <p>{message.content}</p>
              </div>
            ))}
          </div>
        )}
        
        {isLoading && (
          <div className="flex justify-center items-center py-2" data-testid="loading-indicator">
            <p className="text-gray-500">Thinking...</p>
          </div>
        )}
      </div>
      
      {/* Input form */}
      <form onSubmit={handleSubmit} className="flex space-x-2" data-testid="chat-form">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="flex-1 p-2 border rounded"
          data-testid="chat-input"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className={`px-4 py-2 rounded ${
            isLoading || !input.trim()
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
          data-testid="chat-submit"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chatbot; 