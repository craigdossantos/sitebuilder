import React, { act } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import VideoBlock from '../../../components/blocks/VideoBlock';
import '@testing-library/jest-dom';

describe('VideoBlock', () => {
  const mockBlock = {
    id: 'test-video-block',
    type: 'video',
    src: '',
    provider: undefined,
  };

  const mockOnUpdate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the video block with empty URL initially', () => {
    render(<VideoBlock block={mockBlock} onUpdate={mockOnUpdate} />);
    
    // Check if the block title is displayed
    expect(screen.getByText('Video Block')).toBeInTheDocument();
    
    // Check if the URL input is empty
    expect(screen.getByPlaceholderText('Enter YouTube or Vimeo URL')).toHaveValue('');
    
    // Check that no preview is shown initially
    expect(screen.queryByTestId('video-block-preview')).not.toBeInTheDocument();
  });

  it('allows entering a video URL', () => {
    render(<VideoBlock block={mockBlock} onUpdate={mockOnUpdate} />);
    
    const urlInput = screen.getByPlaceholderText('Enter YouTube or Vimeo URL');
    
    // Enter a URL
    fireEvent.change(urlInput, { target: { value: 'https://example.com/video.mp4' } });
    
    // Check if the URL was updated
    expect(urlInput).toHaveValue('https://example.com/video.mp4');
    
    // Check if onUpdate was called with the new URL
    expect(mockOnUpdate).toHaveBeenCalledWith({
      ...mockBlock,
      src: 'https://example.com/video.mp4',
      provider: undefined,
    });
  });

  it('generates YouTube embed URL correctly', () => {
    const youtubeBlock = {
      ...mockBlock,
      src: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      provider: 'youtube',
    };
    
    render(<VideoBlock block={youtubeBlock} onUpdate={mockOnUpdate} />);
    
    // Check if the URL input has the YouTube URL
    expect(screen.getByPlaceholderText('Enter YouTube or Vimeo URL')).toHaveValue('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
    
    // Check if the preview is shown with the correct embed URL
    const preview = screen.getByTestId('video-block-preview');
    expect(preview).toBeInTheDocument();
    
    // Check if the iframe has the correct src attribute
    expect(preview).toHaveAttribute('src', expect.stringContaining('youtube.com/embed/dQw4w9WgXcQ'));
  });

  it('generates Vimeo embed URL correctly', () => {
    const vimeoBlock = {
      ...mockBlock,
      src: 'https://vimeo.com/123456789',
      provider: 'vimeo',
    };
    
    render(<VideoBlock block={vimeoBlock} onUpdate={mockOnUpdate} />);
    
    // Check if the URL input has the Vimeo URL
    expect(screen.getByPlaceholderText('Enter YouTube or Vimeo URL')).toHaveValue('https://vimeo.com/123456789');
    
    // Check if the preview is shown with the correct embed URL
    const preview = screen.getByTestId('video-block-preview');
    expect(preview).toBeInTheDocument();
    
    // Check if the iframe has the correct src attribute
    expect(preview).toHaveAttribute('src', expect.stringContaining('player.vimeo.com/video/123456789'));
  });

  it('shows no preview for invalid URLs', () => {
    const invalidBlock = {
      ...mockBlock,
      src: 'not-a-valid-url',
      provider: undefined,
    };
    
    render(<VideoBlock block={invalidBlock} onUpdate={mockOnUpdate} />);
    
    // Check if the URL input has the invalid URL
    expect(screen.getByPlaceholderText('Enter YouTube or Vimeo URL')).toHaveValue('not-a-valid-url');
    
    // Check that no preview is shown
    expect(screen.queryByTestId('video-block-preview')).not.toBeInTheDocument();
  });
}); 