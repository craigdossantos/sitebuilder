import React from 'react';
import { BlockType } from './types';

interface BlockSelectorProps {
  onSelect: (blockType: BlockType) => void;
  onCancel: () => void;
}

const BlockSelector: React.FC<BlockSelectorProps> = ({ onSelect, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" data-testid="block-selector">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full">
        <h2 className="text-xl font-bold mb-4">Select Block Type</h2>
        
        <div className="space-y-4">
          <button
            onClick={() => onSelect(BlockType.TEXT)}
            className="flex items-center p-4 border rounded hover:bg-gray-50 w-full"
            data-testid="select-text-block"
          >
            <div className="mr-3 text-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <div className="text-left">
              <h3 className="font-medium">Text Block</h3>
              <p className="text-sm text-gray-500">Add formatted text content</p>
            </div>
          </button>
          
          <button
            onClick={() => onSelect(BlockType.IMAGE)}
            className="flex items-center p-4 border rounded hover:bg-gray-50 w-full"
            data-testid="select-image-block"
          >
            <div className="mr-3 text-green-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="text-left">
              <h3 className="font-medium">Image Block</h3>
              <p className="text-sm text-gray-500">Upload and display an image</p>
            </div>
          </button>
          
          <button
            onClick={() => onSelect(BlockType.VIDEO)}
            className="flex items-center p-4 border rounded hover:bg-gray-50 w-full"
            data-testid="select-video-block"
          >
            <div className="mr-3 text-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="text-left">
              <h3 className="font-medium">Video Block</h3>
              <p className="text-sm text-gray-500">Add a YouTube or Vimeo video</p>
            </div>
          </button>

          <button
            onClick={() => onSelect(BlockType.EMBED)}
            className="flex items-center p-4 border rounded hover:bg-gray-50 w-full"
            data-testid="select-embed-block"
          >
            <div className="mr-3 text-purple-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <div className="text-left">
              <h3 className="font-medium">Embed Block</h3>
              <p className="text-sm text-gray-500">Embed Twitter or Instagram content</p>
            </div>
          </button>
          
          <button
            onClick={() => onSelect(BlockType.CHATBOT)}
            className="flex items-center p-4 border rounded hover:bg-gray-50 w-full"
            data-testid="select-chatbot-block"
          >
            <div className="mr-3 text-yellow-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <div className="text-left">
              <h3 className="font-medium">Chatbot Block</h3>
              <p className="text-sm text-gray-500">Add an AI-powered chatbot</p>
            </div>
          </button>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
            data-testid="cancel-block-selection"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlockSelector; 