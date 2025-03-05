import React, { useState } from 'react';
import { ImageBlock as ImageBlockType } from '../types';

interface ImageBlockProps {
  block: ImageBlockType;
  onUpdate: (updatedBlock: ImageBlockType) => void;
}

const ImageBlock: React.FC<ImageBlockProps> = ({ block, onUpdate }) => {
  const [previewSrc, setPreviewSrc] = useState(block.src || '');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create a mock URL for the file (in a real app, you'd upload to a server)
    const mockUrl = URL.createObjectURL(file);
    setPreviewSrc(mockUrl);
    
    onUpdate({
      ...block,
      src: mockUrl,
      alt: file.name || block.alt,
    });
  };

  const handleAltChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({
      ...block,
      alt: e.target.value,
    });
  };

  return (
    <div className="block-container" data-testid="image-block">
      <div className="block-header">
        <h3 className="text-lg font-medium">Image Block</h3>
      </div>
      <div className="block-content">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
            data-testid="image-block-input"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Alt Text
          </label>
          <input
            type="text"
            value={block.alt}
            onChange={handleAltChange}
            className="w-full p-2 border rounded"
            placeholder="Describe the image"
            data-testid="image-block-alt-input"
          />
        </div>
        
        {previewSrc && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
            <img
              src={previewSrc}
              alt={block.alt}
              className="max-w-full h-auto border rounded"
              data-testid="image-block-preview"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageBlock; 