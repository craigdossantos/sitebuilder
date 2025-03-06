import React, { useState, useEffect } from 'react';
import { VideoBlock as VideoBlockType } from '../types';

interface VideoBlockProps {
  block: VideoBlockType;
  onUpdate: (updatedBlock: VideoBlockType) => void;
}

const VideoBlock: React.FC<VideoBlockProps> = ({ block, onUpdate }) => {
  const [videoUrl, setVideoUrl] = useState(block.src || '');
  const [embedUrl, setEmbedUrl] = useState('');

  const getVideoProvider = (url: string): string | null => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      return 'youtube';
    } else if (url.includes('vimeo.com')) {
      return 'vimeo';
    }
    return null;
  };

  const getYouTubeVideoId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const getVimeoVideoId = (url: string): string | null => {
    const regExp = /vimeo\.com\/([0-9]+)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  const generateEmbedUrl = (url: string): string => {
    const provider = getVideoProvider(url);
    if (!provider) return '';

    if (provider === 'youtube') {
      const videoId = getYouTubeVideoId(url);
      return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
    } else if (provider === 'vimeo') {
      const videoId = getVimeoVideoId(url);
      return videoId ? `https://player.vimeo.com/video/${videoId}` : '';
    }

    return '';
  };

  useEffect(() => {
    const newEmbedUrl = generateEmbedUrl(videoUrl);
    setEmbedUrl(newEmbedUrl);
    onUpdate({
      ...block,
      src: videoUrl,
      provider: getVideoProvider(videoUrl) || undefined,
    });
  }, [videoUrl]);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setVideoUrl(newUrl);
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
            placeholder="Enter YouTube or Vimeo URL"
            data-testid="video-block-input"
          />
        </div>
        
        {embedUrl && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={embedUrl}
                className="w-full h-full rounded"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                data-testid="video-block-preview"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoBlock; 