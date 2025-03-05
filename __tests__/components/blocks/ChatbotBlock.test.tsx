import { render, screen, fireEvent } from '@testing-library/react';
import ChatbotBlock from '../../../components/blocks/ChatbotBlock';
import { BlockType } from '../../../components/types';
import '@testing-library/jest-dom';

// Mock the Chatbot component
jest.mock('../../../components/Chatbot', () => {
  return jest.fn(({ initialPrompt, pageContext }) => (
    <div data-testid="mocked-chatbot">
      <div data-testid="chatbot-initial-prompt">{initialPrompt}</div>
      <div data-testid="chatbot-page-context">{pageContext}</div>
    </div>
  ));
});

describe('ChatbotBlock', () => {
  const mockBlock = {
    id: 'test-chatbot-block',
    type: BlockType.CHATBOT,
    prompt: 'Initial chatbot prompt',
  };

  const mockPageContent = 'This is the page content that provides context for the chatbot.';
  const mockOnUpdate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the chatbot block with the correct prompt', () => {
    render(<ChatbotBlock block={mockBlock} onUpdate={mockOnUpdate} pageContent={mockPageContent} />);
    
    // Check if the block title is displayed
    expect(screen.getByText('Chatbot Block')).toBeInTheDocument();
    
    // Check if the prompt textarea has the correct content
    const promptInput = screen.getByTestId('chatbot-prompt-input');
    expect(promptInput).toHaveValue('Initial chatbot prompt');
    
    // Check if the Chatbot component is rendered with the correct props
    expect(screen.getByTestId('mocked-chatbot')).toBeInTheDocument();
    expect(screen.getByTestId('chatbot-initial-prompt')).toHaveTextContent('Initial chatbot prompt');
    expect(screen.getByTestId('chatbot-page-context')).toHaveTextContent(mockPageContent);
  });

  it('calls onUpdate when the prompt changes', () => {
    render(<ChatbotBlock block={mockBlock} onUpdate={mockOnUpdate} />);
    
    // Get the prompt textarea and change its value
    const promptInput = screen.getByTestId('chatbot-prompt-input');
    fireEvent.change(promptInput, { target: { value: 'Updated chatbot prompt' } });
    
    // Check if onUpdate was called with the updated block
    expect(mockOnUpdate).toHaveBeenCalledWith({
      ...mockBlock,
      prompt: 'Updated chatbot prompt',
    });
  });

  it('passes page content to the Chatbot component', () => {
    render(<ChatbotBlock block={mockBlock} onUpdate={mockOnUpdate} pageContent={mockPageContent} />);
    
    // Check if the page content is passed to the Chatbot component
    expect(screen.getByTestId('chatbot-page-context')).toHaveTextContent(mockPageContent);
  });
}); 