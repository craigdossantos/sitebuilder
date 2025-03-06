// Block type definitions for the site builder

export enum BlockType {
  TEXT = 'text',
  IMAGE = 'image',
  VIDEO = 'video',
  CHATBOT = 'chatbot',
  EMBED = 'embed',
}

// Base interface for all block types
export interface Block {
  id: string;
  type: BlockType;
}

// Specific block type interfaces
export interface TextBlock extends Block {
  type: BlockType.TEXT;
  content: string;
}

export interface ImageBlock extends Block {
  type: BlockType.IMAGE;
  src: string;
  alt: string;
}

export interface VideoBlock extends Block {
  type: BlockType.VIDEO;
  src: string;
  provider?: string; // youtube, vimeo, or direct
}

export interface ChatbotBlock extends Block {
  type: BlockType.CHATBOT;
  prompt: string;
}

export interface EmbedBlock extends Block {
  type: BlockType.EMBED;
  url: string;
  provider: string; // youtube, vimeo, twitter, etc.
  embedCode: string;
}

// Type for a page containing blocks
export interface Page {
  slug: string;
  title: string;
  blocks: Block[];
} 