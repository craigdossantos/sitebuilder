import { render, screen, fireEvent } from '@testing-library/react';
import TextBlock from '../../../components/blocks/TextBlock';
import { BlockType } from '../../../components/types';
import '@testing-library/jest-dom';

describe('TextBlock', () => {
  const mockBlock = {
    id: 'test-text-block',
    type: BlockType.TEXT,
    content: 'Initial text content',
  };

  const mockOnUpdate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the text block with the correct content', () => {
    render(<TextBlock block={mockBlock} onUpdate={mockOnUpdate} />);
    
    // Check if the block title is displayed
    expect(screen.getByText('Text Block')).toBeInTheDocument();
    
    // Check if the textarea has the correct content
    const textarea = screen.getByTestId('text-block-input');
    expect(textarea).toHaveValue('Initial text content');
  });

  it('calls onUpdate when the text content changes', () => {
    render(<TextBlock block={mockBlock} onUpdate={mockOnUpdate} />);
    
    // Get the textarea and change its value
    const textarea = screen.getByTestId('text-block-input');
    fireEvent.change(textarea, { target: { value: 'Updated text content' } });
    
    // Check if onUpdate was called with the updated block
    expect(mockOnUpdate).toHaveBeenCalledWith({
      ...mockBlock,
      content: 'Updated text content',
    });
  });
}); 