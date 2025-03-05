/**
 * Generates a unique ID for blocks
 * @returns A unique string ID
 */
export const generateBlockId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

/**
 * Creates default content for a new block based on its type
 * @param blockType The type of block to create default content for
 * @returns An object with default content properties
 */
export const getDefaultBlockContent = (blockType: string): Record<string, any> => {
  switch (blockType) {
    case 'text':
      return { content: '' };
    case 'image':
      return { src: '', alt: '' };
    case 'video':
      return { src: '' };
    case 'chatbot':
      return { prompt: '' };
    default:
      return {};
  }
}; 