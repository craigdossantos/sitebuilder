import { render, screen, fireEvent } from '@testing-library/react';
import Block from '../../components/Block';
import { BlockType } from '../../components/types';
import '@testing-library/jest-dom';

// Mock the block type components
jest.mock('../../components/blocks/TextBlock', () => {
  return jest.fn(() => <div data-testid="mocked-text-block">Mocked Text Block</div>);
});

jest.mock('../../components/blocks/ImageBlock', () => {
  return jest.fn(() => <div data-testid="mocked-image-block">Mocked Image Block</div>);
});

jest.mock('../../components/blocks/VideoBlock', () => {
  return jest.fn(() => <div data-testid="mocked-video-block">Mocked Video Block</div>);
});

describe('Block', () => {
  const mockOnUpdate = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders a text block correctly', () => {
    const textBlock = {
      id: 'text-block-id',
      type: BlockType.TEXT,
      content: 'Text content',
    };

    render(<Block block={textBlock} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />);
    
    // Check if the block container exists
    expect(screen.getByTestId('block-text-block-id')).toBeInTheDocument();
    
    // Check if the delete button exists
    expect(screen.getByTestId('delete-block-text-block-id')).toBeInTheDocument();
    
    // Check if the text block component is rendered
    expect(screen.getByTestId('mocked-text-block')).toBeInTheDocument();
  });

  it('renders an image block correctly', () => {
    const imageBlock = {
      id: 'image-block-id',
      type: BlockType.IMAGE,
      src: 'image.jpg',
      alt: 'Image alt',
    };

    render(<Block block={imageBlock} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />);
    
    // Check if the block container exists
    expect(screen.getByTestId('block-image-block-id')).toBeInTheDocument();
    
    // Check if the delete button exists
    expect(screen.getByTestId('delete-block-image-block-id')).toBeInTheDocument();
    
    // Check if the image block component is rendered
    expect(screen.getByTestId('mocked-image-block')).toBeInTheDocument();
  });

  it('renders a video block correctly', () => {
    const videoBlock = {
      id: 'video-block-id',
      type: BlockType.VIDEO,
      src: 'video.mp4',
    };

    render(<Block block={videoBlock} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />);
    
    // Check if the block container exists
    expect(screen.getByTestId('block-video-block-id')).toBeInTheDocument();
    
    // Check if the delete button exists
    expect(screen.getByTestId('delete-block-video-block-id')).toBeInTheDocument();
    
    // Check if the video block component is rendered
    expect(screen.getByTestId('mocked-video-block')).toBeInTheDocument();
  });

  it('calls onDelete when delete button is clicked', () => {
    const textBlock = {
      id: 'text-block-id',
      type: BlockType.TEXT,
      content: 'Text content',
    };

    render(<Block block={textBlock} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />);
    
    // Click the delete button
    fireEvent.click(screen.getByTestId('delete-block-text-block-id'));
    
    // Check if onDelete was called with the correct block ID
    expect(mockOnDelete).toHaveBeenCalledWith('text-block-id');
  });

  it('renders unknown block type message for invalid block types', () => {
    // @ts-ignore - Intentionally creating an invalid block type for testing
    const invalidBlock = {
      id: 'invalid-block-id',
      type: 'invalid-type',
    };

    render(<Block block={invalidBlock} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />);
    
    // Check if the unknown block type message is displayed
    expect(screen.getByText('Unknown block type')).toBeInTheDocument();
  });
}); 