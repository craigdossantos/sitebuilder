import { generateSEOData, validateSEOData } from '../../utils/seo';

describe('SEO Utilities', () => {
  describe('generateSEOData', () => {
    it('generates title and description from content', () => {
      const content = 'This is a test page with some content';
      const seoData = generateSEOData(content);

      expect(seoData.title).toBe('This is a test page - Site Builder');
      expect(seoData.description).toBe(content);
    });

    it('truncates long descriptions', () => {
      const longContent = 'A'.repeat(200);
      const seoData = generateSEOData(longContent);

      expect(seoData.description.length).toBeLessThanOrEqual(160);
      expect(seoData.description.endsWith('...')).toBe(true);
    });

    it('handles empty content', () => {
      const seoData = generateSEOData('');

      expect(seoData.title).toBe('Site Builder');
      expect(seoData.description).toBe('Welcome to Site Builder');
    });
  });

  describe('validateSEOData', () => {
    it('returns valid SEO data unchanged', () => {
      const title = 'Test Page';
      const description = 'Test description';
      const seoData = validateSEOData(title, description);

      expect(seoData.title).toBe(title);
      expect(seoData.description).toBe(description);
    });

    it('provides default values for missing data', () => {
      const seoData = validateSEOData();

      expect(seoData.title).toBe('Site Builder');
      expect(seoData.description).toBe('Create and manage your website with Site Builder');
    });

    it('truncates long descriptions', () => {
      const longDescription = 'A'.repeat(200);
      const seoData = validateSEOData('Test', longDescription);

      expect(seoData.description.length).toBeLessThanOrEqual(160);
      expect(seoData.description.endsWith('...')).toBe(true);
    });

    it('handles empty strings', () => {
      const seoData = validateSEOData('', '');

      expect(seoData.title).toBe('Site Builder');
      expect(seoData.description).toBe('Create and manage your website with Site Builder');
    });
  });
}); 