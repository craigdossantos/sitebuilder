import React, { useState } from 'react';
import { VideoBlock as VideoBlockType } from '../types';

interface VideoBlockProps {
  block: VideoBlockType;
  onUpdate: (updatedBlock: VideoBlockType) => void;
}

const VideoBlock: React.FC<VideoBlockProps> = ({ block, onUpdate }) => {
  const [videoUrl, setVideoUrl] = useState(block.src || '');

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setVideoUrl(newUrl);
    onUpdate({
      ...block,
      src: newUrl,
    });
  };

  // Simple function to check if the URL is valid for preview
  const isValidUrl = (url: string) => {
    return url.trim() !== '' && (
      url.startsWith('http://') || 
      url.startsWith('https://') || 
      url.startsWith('www.')
    );
  };

  return (
    <div className="block-container" data-testid="video-block">
      <div className="block-header">
        <h3 className="text-lg font-medium">Video Block</h3>
      </div>
      <div className="block-content">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Video URL
          </label>
          <input
            type="text"
            value={videoUrl}
            onChange={handleUrlChange}
            className="w-full p-2 border rounded"
            placeholder="Enter video URL (YouTube, Vimeo, etc.)"
            data-testid="video-block-input"
          />
        </div>
        
        {isValidUrl(videoUrl) && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
            <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded">
              {/* In a real app, you'd parse the URL and create a proper embed */}
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">
                  Video preview would appear here: {videoUrl}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoBlock; 