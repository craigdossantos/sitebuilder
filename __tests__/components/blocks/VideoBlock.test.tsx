import { render, screen, fireEvent } from '@testing-library/react';
import VideoBlock from '../../../components/blocks/VideoBlock';
import { BlockType } from '../../../components/types';
import '@testing-library/jest-dom';

describe('VideoBlock', () => {
  const mockBlock = {
    id: 'test-video-block',
    type: BlockType.VIDEO,
    src: '',
  };

  const mockOnUpdate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the video block with empty URL initially', () => {
    render(<VideoBlock block={mockBlock} onUpdate={mockOnUpdate} />);
    
    // Check if the block title is displayed
    expect(screen.getByText('Video Block')).toBeInTheDocument();
    
    // Check if the URL input exists and is empty
    const urlInput = screen.getByTestId('video-block-input');
    expect(urlInput).toHaveValue('');
    
    // Check that no preview is shown initially
    expect(screen.queryByText(/Video preview would appear here/)).not.toBeInTheDocument();
  });

  it('calls onUpdate when the video URL changes', () => {
    render(<VideoBlock block={mockBlock} onUpdate={mockOnUpdate} />);
    
    // Get the URL input and change its value
    const urlInput = screen.getByTestId('video-block-input');
    fireEvent.change(urlInput, { target: { value: 'https://example.com/video.mp4' } });
    
    // Check if onUpdate was called with the updated block
    expect(mockOnUpdate).toHaveBeenCalledWith({
      ...mockBlock,
      src: 'https://example.com/video.mp4',
    });
  });

  it('shows a preview when a valid URL is entered', () => {
    render(<VideoBlock block={mockBlock} onUpdate={mockOnUpdate} />);
    
    // Get the URL input and change its value to a valid URL
    const urlInput = screen.getByTestId('video-block-input');
    fireEvent.change(urlInput, { target: { value: 'https://example.com/video.mp4' } });
    
    // Check if the preview is displayed
    expect(screen.getByText(/Video preview would appear here: https:\/\/example.com\/video.mp4/)).toBeInTheDocument();
  });

  it('does not show a preview for invalid URLs', () => {
    render(<VideoBlock block={mockBlock} onUpdate={mockOnUpdate} />);
    
    // Get the URL input and change its value to an invalid URL
    const urlInput = screen.getByTestId('video-block-input');
    fireEvent.change(urlInput, { target: { value: 'invalid-url' } });
    
    // Check that no preview is shown
    expect(screen.queryByText(/Video preview would appear here/)).not.toBeInTheDocument();
  });

  it('renders with an existing video URL', () => {
    // Create a block with an existing video URL
    const blockWithVideo = {
      ...mockBlock,
      src: 'https://example.com/existing-video.mp4',
    };
    
    render(<VideoBlock block={blockWithVideo} onUpdate={mockOnUpdate} />);
    
    // Check if the URL input has the correct value
    const urlInput = screen.getByTestId('video-block-input');
    expect(urlInput).toHaveValue('https://example.com/existing-video.mp4');
    
    // Check if the preview is displayed
    expect(screen.getByText(/Video preview would appear here: https:\/\/example.com\/existing-video.mp4/)).toBeInTheDocument();
  });
}); 