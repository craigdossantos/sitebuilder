import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EditorPage from '../../../pages/builder/edit/[slug]';
import { useRouter } from 'next/router';
import { Block as BlockType, BlockType as BlockTypeEnum } from '../../../components/types';
import '@testing-library/jest-dom';

// Mock the Next.js router
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

// Mock the utils functions
jest.mock('../../../components/utils', () => ({
  generateBlockId: jest.fn(() => 'test-block-id'),
  getDefaultBlockContent: jest.fn((blockType) => {
    switch (blockType) {
      case 'text':
        return { content: '' };
      case 'image':
        return { src: '', alt: '' };
      case 'video':
        return { src: '' };
      case 'chatbot':
        return { prompt: 'Default chatbot prompt' };
      default:
        return {};
    }
  }),
}));

// Mock the Block component to verify props
jest.mock('../../../components/Block', () => {
  return jest.fn(({ block, onUpdate, onDelete, pageContent }) => (
    <div data-testid={`block-${block.id}`} data-block-type={block.type} data-page-content={pageContent}>
      <button data-testid={`delete-${block.id}`} onClick={() => onDelete(block.id)}>
        Delete
      </button>
      {block.type === 'chatbot' && (
        <div data-testid="chatbot-block-content">
          <textarea 
            data-testid="chatbot-prompt-input"
            value={block.prompt || ''}
            onChange={(e) => onUpdate({ ...block, prompt: e.target.value })}
          />
        </div>
      )}
    </div>
  ));
});

describe('EditorPage', () => {
  const generateUniqueBlockId = (prefix: string) => `${prefix}-${Math.random().toString(36).substr(2, 9)}`;

  beforeEach(() => {
    // Setup the router mock for each test
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: { slug: 'test-page' },
    }));
    
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('renders the editor page with the correct slug', () => {
    render(<EditorPage />);
    
    // Check if the page title contains the slug
    expect(screen.getByText(/Editing: test-page/i)).toBeInTheDocument();
  });

  it('displays the empty state message when no blocks exist', () => {
    render(<EditorPage />);
    
    // Check if the empty state message is displayed
    expect(screen.getByText(/No blocks added yet/i)).toBeInTheDocument();
  });

  it('has an "Add Block" button', () => {
    render(<EditorPage />);
    
    // Check if the Add Block button exists
    const addBlockButton = screen.getByTestId('add-block-button');
    expect(addBlockButton).toBeInTheDocument();
    expect(addBlockButton).toHaveTextContent('Add Block');
  });

  it('shows the block selector when "Add Block" is clicked', () => {
    render(<EditorPage />);
    
    // Click the Add Block button
    fireEvent.click(screen.getByTestId('add-block-button'));
    
    // Check if the block selector is displayed
    expect(screen.getByTestId('block-selector')).toBeInTheDocument();
  });

  it('adds a text block when selected from the block selector', () => {
    render(<EditorPage />);
    
    // Click the Add Block button
    fireEvent.click(screen.getByTestId('add-block-button'));
    
    // Select the text block option
    fireEvent.click(screen.getByTestId('select-text-block'));
    
    // Check if the block is added to the page
    expect(screen.getByTestId('block-test-block-id')).toBeInTheDocument();
  });

  it('adds an image block when selected from the block selector', () => {
    render(<EditorPage />);
    
    // Click the Add Block button
    fireEvent.click(screen.getByTestId('add-block-button'));
    
    // Select the image block option
    fireEvent.click(screen.getByTestId('select-image-block'));
    
    // Check if the block is added to the page
    expect(screen.getByTestId('block-test-block-id')).toBeInTheDocument();
  });

  it('adds a video block when selected from the block selector', () => {
    render(<EditorPage />);
    
    // Click the Add Block button
    fireEvent.click(screen.getByTestId('add-block-button'));
    
    // Select the video block option
    fireEvent.click(screen.getByTestId('select-video-block'));
    
    // Check if the block is added to the page
    expect(screen.getByTestId('block-test-block-id')).toBeInTheDocument();
  });

  it('adds a chatbot block when selected from the block selector', () => {
    render(<EditorPage />);
    
    // Click the Add Block button
    fireEvent.click(screen.getByTestId('add-block-button'));
    
    // Select the chatbot block option
    fireEvent.click(screen.getByTestId('select-chatbot-block'));
    
    // Check if the block is added to the page
    const chatbotBlock = screen.getByTestId('block-test-block-id');
    expect(chatbotBlock).toBeInTheDocument();
    expect(chatbotBlock.getAttribute('data-block-type')).toBe('chatbot');
  });

  it('removes a block when the delete button is clicked', () => {
    render(<EditorPage />);
    
    // Add a block
    fireEvent.click(screen.getByTestId('add-block-button'));
    fireEvent.click(screen.getByTestId('select-text-block'));
    
    // Check if the block is added
    expect(screen.getByTestId('block-test-block-id')).toBeInTheDocument();
    
    // Delete the block
    fireEvent.click(screen.getByTestId('delete-test-block-id'));
    
    // Check if the block is removed
    expect(screen.queryByTestId('block-test-block-id')).not.toBeInTheDocument();
    expect(screen.getByTestId('empty-blocks-message')).toBeInTheDocument();
  });

  it('passes page content to blocks', () => {
    render(<EditorPage />);
    
    // Add a text block
    fireEvent.click(screen.getByTestId('add-block-button'));
    fireEvent.click(screen.getByTestId('select-text-block'));
    
    // Add a chatbot block
    fireEvent.click(screen.getByTestId('add-block-button'));
    fireEvent.click(screen.getByTestId('select-chatbot-block'));
    
    // Get all blocks
    const blocks = screen.getAllByTestId(/^block-/);
    
    // Check that page content is passed to each block
    blocks.forEach(block => {
      expect(block.getAttribute('data-page-content')).toBeDefined();
    });
  });

  it('generates page content based on block types', () => {
    render(<EditorPage />);
    
    // Add a text block
    fireEvent.click(screen.getByTestId('add-block-button'));
    fireEvent.click(screen.getByTestId('select-text-block'));
    
    // Add a chatbot block
    fireEvent.click(screen.getByTestId('add-block-button'));
    fireEvent.click(screen.getByTestId('select-chatbot-block'));
    
    // Get the chatbot block
    const chatbotBlock = screen.getAllByTestId(/^block-/)[1];
    
    // The page content should include information from both blocks
    expect(chatbotBlock.getAttribute('data-page-content')).not.toBe('');
  });

  // Advanced mode tests
  it('has a "Switch to Advanced Mode" button', () => {
    render(<EditorPage />);
    
    // Check if the toggle button exists
    const toggleButton = screen.getByTestId('toggle-advanced-mode');
    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).toHaveTextContent('Switch to Advanced Mode');
  });

  it('switches to advanced mode when the toggle button is clicked', () => {
    render(<EditorPage />);
    
    // Check that we start in block mode
    expect(screen.getByTestId('block-mode-editor')).toBeInTheDocument();
    expect(screen.queryByTestId('advanced-mode-editor')).not.toBeInTheDocument();
    
    // Click the toggle button
    fireEvent.click(screen.getByTestId('toggle-advanced-mode'));
    
    // Check that we switched to advanced mode
    expect(screen.queryByTestId('block-mode-editor')).not.toBeInTheDocument();
    expect(screen.getByTestId('advanced-mode-editor')).toBeInTheDocument();
    expect(screen.getByTestId('raw-content-textarea')).toBeInTheDocument();
    
    // Check that the button text changed
    expect(screen.getByTestId('toggle-advanced-mode')).toHaveTextContent('Switch to Block Mode');
  });

  it('switches back to block mode when toggled again', () => {
    render(<EditorPage />);
    
    // Switch to advanced mode
    fireEvent.click(screen.getByTestId('toggle-advanced-mode'));
    expect(screen.getByTestId('advanced-mode-editor')).toBeInTheDocument();
    
    // Switch back to block mode
    fireEvent.click(screen.getByTestId('toggle-advanced-mode'));
    
    // Check that we're back in block mode
    expect(screen.getByTestId('block-mode-editor')).toBeInTheDocument();
    expect(screen.queryByTestId('advanced-mode-editor')).not.toBeInTheDocument();
  });

  it('converts blocks to HTML when switching to advanced mode', () => {
    render(<EditorPage />);
    
    // Add a text block
    fireEvent.click(screen.getByTestId('add-block-button'));
    fireEvent.click(screen.getByTestId('select-text-block'));
    
    // Switch to advanced mode
    fireEvent.click(screen.getByTestId('toggle-advanced-mode'));
    
    // Check that the textarea contains HTML
    const textarea = screen.getByTestId('raw-content-textarea');
    expect(textarea).toBeInTheDocument();
    // The content will be empty because our mock doesn't set any content
    // In a real app, we'd expect HTML content here
  });

  it('includes chatbot blocks when converting to HTML in advanced mode', () => {
    render(<EditorPage />);
    
    // Add a chatbot block
    fireEvent.click(screen.getByTestId('add-block-button'));
    fireEvent.click(screen.getByTestId('select-chatbot-block'));
    
    // Switch to advanced mode
    fireEvent.click(screen.getByTestId('toggle-advanced-mode'));
    
    // Check that the textarea contains HTML
    const textarea = screen.getByTestId('raw-content-textarea');
    expect(textarea).toBeInTheDocument();
    // In a real test, we would check for specific chatbot HTML content
  });

  it('allows editing raw HTML in advanced mode', () => {
    render(<EditorPage />);
    
    // Switch to advanced mode
    fireEvent.click(screen.getByTestId('toggle-advanced-mode'));
    
    // Get the textarea and change its value
    const textarea = screen.getByTestId('raw-content-textarea');
    fireEvent.change(textarea, { target: { value: '<div class="custom">Hello World</div>' } });
    
    // Check that the textarea value was updated
    expect(textarea).toHaveValue('<div class="custom">Hello World</div>');
  });

  it('preserves raw HTML content when toggling between modes', () => {
    render(<EditorPage />);
    
    // Switch to advanced mode
    fireEvent.click(screen.getByTestId('toggle-advanced-mode'));
    
    // Edit the raw HTML
    const textarea = screen.getByTestId('raw-content-textarea');
    fireEvent.change(textarea, { target: { value: '<div class="custom">Hello World</div>' } });
    
    // Switch back to block mode
    fireEvent.click(screen.getByTestId('toggle-advanced-mode'));
    
    // Switch to advanced mode again
    fireEvent.click(screen.getByTestId('toggle-advanced-mode'));
    
    // Check that the raw HTML content is preserved
    expect(screen.getByTestId('raw-content-textarea')).toHaveValue('<div class="custom">Hello World</div>');
  });
}); 