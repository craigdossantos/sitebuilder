import React, { useState } from 'react';
import { ChatbotBlock as ChatbotBlockType } from '../types';
import Chatbot from '../Chatbot';

interface ChatbotBlockProps {
  block: ChatbotBlockType;
  onUpdate: (updatedBlock: ChatbotBlockType) => void;
  pageContent?: string;
}

const ChatbotBlock: React.FC<ChatbotBlockProps> = ({ block, onUpdate, pageContent = '' }) => {
  const [prompt, setPrompt] = useState(block.prompt);

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newPrompt = e.target.value;
    setPrompt(newPrompt);
    onUpdate({
      ...block,
      prompt: newPrompt,
    });
  };

  return (
    <div className="chatbot-block" data-testid="chatbot-block">
      <div className="block-header mb-4">
        <h3 className="text-lg font-medium">Chatbot Block</h3>
        <div className="mt-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Initial Prompt (System Message)
          </label>
          <textarea
            value={prompt}
            onChange={handlePromptChange}
            className="w-full p-2 border rounded"
            rows={3}
            placeholder="Enter an initial prompt for the chatbot..."
            data-testid="chatbot-prompt-input"
          />
        </div>
      </div>
      <div className="block-content">
        <Chatbot 
          initialPrompt={prompt} 
          placeholder="Ask a question..." 
          pageContext={pageContent}
          data-testid="chatbot-instance"
        />
      </div>
    </div>
  );
};

export default ChatbotBlock; 