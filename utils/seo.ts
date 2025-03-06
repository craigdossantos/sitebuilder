/**
 * Generates SEO metadata from content
 * In a production environment, this would call OpenAI's API
 * For now, it generates mock data based on the content
 */
export function generateSEOData(content: string) {
  // Mock implementation
  // In production, this would use OpenAI to generate relevant title and description
  const words = content.split(/\s+/).filter(word => word.length > 0);
  const firstFewWords = words.slice(0, 5).join(' ');
  
  return {
    title: firstFewWords ? `${firstFewWords} - Site Builder` : 'Site Builder',
    description: content.length > 160 
      ? `${content.substring(0, 157)}...`
      : content || 'Welcome to Site Builder',
  };
}

/**
 * Validates SEO data
 */
export function validateSEOData(title?: string, description?: string) {
  return {
    title: title && title.length > 0 ? title : 'Site Builder',
    description: description && description.length > 0 
      ? (description.length > 160 ? `${description.substring(0, 157)}...` : description)
      : 'Create and manage your website with Site Builder',
  };
} 