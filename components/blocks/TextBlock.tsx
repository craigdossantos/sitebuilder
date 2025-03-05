import React, { useState } from 'react';
import { TextBlock as TextBlockType } from '../types';

interface TextBlockProps {
  block: TextBlockType;
  onUpdate: (updatedBlock: TextBlockType) => void;
}

const TextBlock: React.FC<TextBlockProps> = ({ block, onUpdate }) => {
  const [content, setContent] = useState(block.content);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    onUpdate({
      ...block,
      content: newContent,
    });
  };

  return (
    <div className="block-container" data-testid="text-block">
      <div className="block-header">
        <h3 className="text-lg font-medium">Text Block</h3>
      </div>
      <div className="block-content">
        <textarea
          className="w-full p-2 border rounded"
          rows={4}
          value={content}
          onChange={handleChange}
          placeholder="Enter your text here..."
          data-testid="text-block-input"
        />
      </div>
    </div>
  );
};

export default TextBlock; 