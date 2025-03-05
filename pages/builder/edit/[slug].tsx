import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Block as BlockType, BlockType as BlockTypeEnum } from '../../../components/types';
import Block from '../../../components/Block';
import BlockSelector from '../../../components/BlockSelector';
import { generateBlockId, getDefaultBlockContent } from '../../../components/utils';

const EditorPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  
  // State to hold the blocks for this page
  const [blocks, setBlocks] = useState<BlockType[]>([]);
  
  // State to control the block selector modal
  const [showBlockSelector, setShowBlockSelector] = useState(false);
  
  // State to toggle between block-based and advanced mode
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);
  
  // State to hold the raw HTML/CSS content in advanced mode
  const [rawContent, setRawContent] = useState('');
  
  // Effect to convert blocks to raw HTML when switching to advanced mode
  useEffect(() => {
    if (isAdvancedMode && rawContent === '') {
      // Simple conversion of blocks to HTML
      // In a real app, this would be more sophisticated
      const html = blocks.map(block => {
        switch (block.type) {
          case BlockTypeEnum.TEXT:
            return `<div class="text-block">${(block as any).content}</div>`;
          case BlockTypeEnum.IMAGE:
            return `<img src="${(block as any).src}" alt="${(block as any).alt}" class="image-block" />`;
          case BlockTypeEnum.VIDEO:
            return `<div class="video-block"><iframe src="${(block as any).src}"></iframe></div>`;
          default:
            return '';
        }
      }).join('\n\n');
      
      setRawContent(html);
    }
  }, [isAdvancedMode, blocks, rawContent]);

  // Function to add a new block
  const handleAddBlock = () => {
    setShowBlockSelector(true);
  };

  // Function to handle block type selection
  const handleBlockTypeSelect = (blockType: BlockTypeEnum) => {
    const newBlock = {
      id: generateBlockId(),
      type: blockType,
      ...getDefaultBlockContent(blockType),
    } as BlockType;
    
    setBlocks([...blocks, newBlock]);
    setShowBlockSelector(false);
  };

  // Function to update a block
  const handleUpdateBlock = (updatedBlock: BlockType) => {
    setBlocks(blocks.map(block => 
      block.id === updatedBlock.id ? updatedBlock : block
    ));
  };

  // Function to delete a block
  const handleDeleteBlock = (blockId: string) => {
    setBlocks(blocks.filter(block => block.id !== blockId));
  };
  
  // Function to toggle between block-based and advanced mode
  const toggleAdvancedMode = () => {
    setIsAdvancedMode(!isAdvancedMode);
  };
  
  // Function to handle changes in the raw content textarea
  const handleRawContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRawContent(e.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>Edit Page: {slug}</title>
      </Head>
      
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Editing: {slug}</h1>
        
        <div className="mt-4 flex justify-end">
          <button
            onClick={toggleAdvancedMode}
            className={`px-4 py-2 rounded ${
              isAdvancedMode 
                ? 'bg-gray-200 text-gray-800' 
                : 'bg-purple-600 text-white hover:bg-purple-700'
            }`}
            data-testid="toggle-advanced-mode"
          >
            {isAdvancedMode ? 'Switch to Block Mode' : 'Switch to Advanced Mode'}
          </button>
        </div>
      </header>
      
      <main>
        {isAdvancedMode ? (
          <div className="bg-white rounded-lg shadow p-6 mb-6" data-testid="advanced-mode-editor">
            <h2 className="text-xl font-semibold mb-4">Advanced HTML/CSS Editor</h2>
            <p className="text-sm text-gray-500 mb-4">
              Edit raw HTML and use Tailwind classes directly. Changes here will not be reflected in block mode.
            </p>
            <textarea
              value={rawContent}
              onChange={handleRawContentChange}
              className="w-full h-96 p-4 font-mono text-sm border rounded"
              placeholder="Enter your HTML/CSS here..."
              data-testid="raw-content-textarea"
            />
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6 mb-6" data-testid="block-mode-editor">
            <h2 className="text-xl font-semibold mb-4">Blocks</h2>
            
            {blocks.length === 0 ? (
              <div className="text-gray-500 text-center py-8" data-testid="empty-blocks-message">
                No blocks added yet. Click "Add Block" to start building your page.
              </div>
            ) : (
              <div className="space-y-4" data-testid="blocks-container">
                {blocks.map((block) => (
                  <Block
                    key={block.id}
                    block={block}
                    onUpdate={handleUpdateBlock}
                    onDelete={handleDeleteBlock}
                  />
                ))}
              </div>
            )}
            
            <div className="flex justify-center mt-6">
              <button
                onClick={handleAddBlock}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                data-testid="add-block-button"
              >
                Add Block
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Block Selector Modal */}
      {showBlockSelector && (
        <BlockSelector
          onSelect={handleBlockTypeSelect}
          onCancel={() => setShowBlockSelector(false)}
        />
      )}
    </div>
  );
};

export default EditorPage; 