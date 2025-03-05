import React from 'react';
import { Block as BlockType, BlockType as BlockTypeEnum } from './types';
import TextBlock from './blocks/TextBlock';
import ImageBlock from './blocks/ImageBlock';
import VideoBlock from './blocks/VideoBlock';

interface BlockProps {
  block: BlockType;
  onUpdate: (updatedBlock: BlockType) => void;
  onDelete: (blockId: string) => void;
}

const Block: React.FC<BlockProps> = ({ block, onUpdate, onDelete }) => {
  const renderBlockContent = () => {
    switch (block.type) {
      case BlockTypeEnum.TEXT:
        return <TextBlock block={block} onUpdate={onUpdate} />;
      case BlockTypeEnum.IMAGE:
        return <ImageBlock block={block} onUpdate={onUpdate} />;
      case BlockTypeEnum.VIDEO:
        return <VideoBlock block={block} onUpdate={onUpdate} />;
      default:
        return <div>Unknown block type</div>;
    }
  };

  return (
    <div className="border rounded-lg p-4 mb-4 bg-white shadow-sm" data-testid={`block-${block.id}`}>
      <div className="flex justify-end mb-2">
        <button
          onClick={() => onDelete(block.id)}
          className="text-red-500 hover:text-red-700"
          aria-label="Delete block"
          data-testid={`delete-block-${block.id}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      {renderBlockContent()}
    </div>
  );
};

export default Block; 