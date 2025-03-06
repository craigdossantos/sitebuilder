import React, { useState, useEffect } from 'react';
import { EmbedBlock as EmbedBlockType } from '../types';

interface EmbedBlockProps {
  block: EmbedBlockType;
  onUpdate: (updatedBlock: EmbedBlockType) => void;
}

const EmbedBlock: React.FC<EmbedBlockProps> = ({ block, onUpdate }) => {
  const [url, setUrl] = useState(block.url || '');
  const [embedCode, setEmbedCode] = useState(block.embedCode || '');

  const getEmbedProvider = (url: string): string | null => {
    if (url.includes('twitter.com')) {
      return 'twitter';
    } else if (url.includes('instagram.com')) {
      return 'instagram';
    }
    return null;
  };

  const generateEmbedCode = (url: string): string => {
    const provider = getEmbedProvider(url);
    if (!provider) return '';

    if (provider === 'twitter') {
      // Extract tweet ID and create Twitter embed
      const tweetMatch = url.match(/twitter\.com\/\w+\/status\/(\d+)/);
      if (tweetMatch) {
        return `<blockquote class="twitter-tweet"><a href="${url}"></a></blockquote><script async src="https://platform.twitter.com/widgets.js"></script>`;
      }
    } else if (provider === 'instagram') {
      // Extract Instagram post ID and create Instagram embed
      const instaMatch = url.match(/instagram\.com\/p\/([^/]+)/);
      if (instaMatch) {
        return `<blockquote class="instagram-media"><a href="${url}"></a></blockquote><script async src="//www.instagram.com/embed.js"></script>`;
      }
    }

    return '';
  };

  useEffect(() => {
    const newEmbedCode = generateEmbedCode(url);
    setEmbedCode(newEmbedCode);
    if (newEmbedCode) {
      onUpdate({
        ...block,
        url,
        provider: getEmbedProvider(url) || 'unknown',
        embedCode: newEmbedCode,
      });
    }
  }, [url]);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
  };

  return (
    <div className="block-container" data-testid="embed-block">
      <div className="block-header">
        <h3 className="text-lg font-medium">Embed Block</h3>
      </div>
      <div className="block-content">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            URL to Embed
          </label>
          <input
            type="text"
            value={url}
            onChange={handleUrlChange}
            className="w-full p-2 border rounded"
            placeholder="Enter Twitter or Instagram URL"
            data-testid="embed-block-input"
          />
        </div>
        
        {embedCode && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
            <div 
              className="embed-preview rounded overflow-hidden"
              dangerouslySetInnerHTML={{ __html: embedCode }}
              data-testid="embed-block-preview"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default EmbedBlock; 