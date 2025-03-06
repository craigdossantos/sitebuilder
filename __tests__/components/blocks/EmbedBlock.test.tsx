import React, { act } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EmbedBlock from '../../../components/blocks/EmbedBlock';
import '@testing-library/jest-dom';

describe('EmbedBlock', () => {
  const mockBlock = {
    id: 'test-embed-block',
    type: 'embed',
    url: '',
    provider: '',
    embedCode: '',
  };

  const mockOnUpdate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the embed block with empty URL initially', () => {
    render(<EmbedBlock block={mockBlock} onUpdate={mockOnUpdate} />);
    
    // Check if the block title is displayed
    expect(screen.getByText('Embed Block')).toBeInTheDocument();
    
    // Check if the URL input is empty
    expect(screen.getByPlaceholderText('Enter Twitter or Instagram URL')).toHaveValue('');
    
    // Check that no preview is shown initially
    expect(screen.queryByTestId('embed-block-preview')).not.toBeInTheDocument();
  });

  it('allows entering an embed URL', () => {
    render(<EmbedBlock block={mockBlock} onUpdate={mockOnUpdate} />);
    
    const urlInput = screen.getByPlaceholderText('Enter Twitter or Instagram URL');
    
    // Enter a URL
    fireEvent.change(urlInput, { target: { value: 'https://twitter.com/user/status/123456789' } });
    
    // Check if the URL was updated
    expect(urlInput).toHaveValue('https://twitter.com/user/status/123456789');
    
    // Check if onUpdate was called with the new URL
    expect(mockOnUpdate).toHaveBeenCalledWith({
      ...mockBlock,
      url: 'https://twitter.com/user/status/123456789',
      provider: 'twitter',
      embedCode: expect.stringContaining('twitter-tweet'),
    });
  });

  it('detects Twitter URLs correctly', () => {
    const twitterBlock = {
      ...mockBlock,
      url: 'https://twitter.com/user/status/123456789',
      provider: 'twitter',
      embedCode: '<blockquote class="twitter-tweet"><a href="https://twitter.com/user/status/123456789"></a></blockquote><script async src="https://platform.twitter.com/widgets.js"></script>',
    };
    
    render(<EmbedBlock block={twitterBlock} onUpdate={mockOnUpdate} />);
    
    // Check if the URL input has the Twitter URL
    expect(screen.getByPlaceholderText('Enter Twitter or Instagram URL')).toHaveValue('https://twitter.com/user/status/123456789');
    
    // Check if the preview is shown
    const preview = screen.getByTestId('embed-block-preview');
    expect(preview).toBeInTheDocument();
    
    // Check if the preview contains the Twitter embed code
    expect(preview.innerHTML).toContain('twitter-tweet');
  });

  it('detects Instagram URLs correctly', () => {
    const instagramBlock = {
      ...mockBlock,
      url: 'https://www.instagram.com/p/ABC123/',
      provider: 'instagram',
      embedCode: '<blockquote class="instagram-media"><a href="https://www.instagram.com/p/ABC123/"></a></blockquote><script async src="//www.instagram.com/embed.js"></script>',
    };
    
    render(<EmbedBlock block={instagramBlock} onUpdate={mockOnUpdate} />);
    
    // Check if the URL input has the Instagram URL
    expect(screen.getByPlaceholderText('Enter Twitter or Instagram URL')).toHaveValue('https://www.instagram.com/p/ABC123/');
    
    // Check if the preview is shown
    const preview = screen.getByTestId('embed-block-preview');
    expect(preview).toBeInTheDocument();
    
    // Check if the preview contains the Instagram embed code
    expect(preview.innerHTML).toContain('instagram-media');
  });

  it('shows no preview for invalid URLs', () => {
    const invalidBlock = {
      ...mockBlock,
      url: 'not-a-valid-url',
    };
    
    render(<EmbedBlock block={invalidBlock} onUpdate={mockOnUpdate} />);
    
    // Check if the URL input has the invalid URL
    expect(screen.getByPlaceholderText('Enter Twitter or Instagram URL')).toHaveValue('not-a-valid-url');
    
    // Check that no preview is shown
    expect(screen.queryByTestId('embed-block-preview')).not.toBeInTheDocument();
  });
}); 