import { render, screen, fireEvent } from '@testing-library/react';
import ImageBlock from '../../../components/blocks/ImageBlock';
import { BlockType } from '../../../components/types';
import '@testing-library/jest-dom';

// Mock URL.createObjectURL
global.URL.createObjectURL = jest.fn(() => 'mock-image-url');

describe('ImageBlock', () => {
  const mockBlock = {
    id: 'test-image-block',
    type: BlockType.IMAGE,
    src: '',
    alt: '',
  };

  const mockOnUpdate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the image block with empty fields initially', () => {
    render(<ImageBlock block={mockBlock} onUpdate={mockOnUpdate} />);
    
    // Check if the block title is displayed
    expect(screen.getByText('Image Block')).toBeInTheDocument();
    
    // Check if the file input exists
    expect(screen.getByTestId('image-block-input')).toBeInTheDocument();
    
    // Check if the alt text input exists and is empty
    const altInput = screen.getByTestId('image-block-alt-input');
    expect(altInput).toHaveValue('');
    
    // Check that no preview is shown initially
    expect(screen.queryByTestId('image-block-preview')).not.toBeInTheDocument();
  });

  it('calls onUpdate when a file is selected', () => {
    render(<ImageBlock block={mockBlock} onUpdate={mockOnUpdate} />);
    
    // Create a mock file
    const file = new File(['dummy content'], 'test-image.png', { type: 'image/png' });
    
    // Get the file input and simulate a file selection
    const fileInput = screen.getByTestId('image-block-input');
    fireEvent.change(fileInput, { target: { files: [file] } });
    
    // Check if onUpdate was called with the updated block
    expect(mockOnUpdate).toHaveBeenCalledWith({
      ...mockBlock,
      src: 'mock-image-url',
      alt: 'test-image.png',
    });
  });

  it('calls onUpdate when alt text is changed', () => {
    render(<ImageBlock block={mockBlock} onUpdate={mockOnUpdate} />);
    
    // Get the alt text input and change its value
    const altInput = screen.getByTestId('image-block-alt-input');
    fireEvent.change(altInput, { target: { value: 'Test alt text' } });
    
    // Check if onUpdate was called with the updated block
    expect(mockOnUpdate).toHaveBeenCalledWith({
      ...mockBlock,
      alt: 'Test alt text',
    });
  });

  it('shows a preview when an image is selected', () => {
    // Create a block with an existing image
    const blockWithImage = {
      ...mockBlock,
      src: 'existing-image.jpg',
      alt: 'Existing image',
    };
    
    render(<ImageBlock block={blockWithImage} onUpdate={mockOnUpdate} />);
    
    // Check if the preview is displayed
    const preview = screen.getByTestId('image-block-preview');
    expect(preview).toBeInTheDocument();
    expect(preview).toHaveAttribute('src', 'existing-image.jpg');
    expect(preview).toHaveAttribute('alt', 'Existing image');
  });
}); 