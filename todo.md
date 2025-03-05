# Project Setup Todo List

## Completed ✅
- Initialize Next.js project with TypeScript
- Configure ESLint with Prettier integration
- Set up Jest and React Testing Library for testing
- Create basic component structure
- Write initial tests
- Fix import path issues
- Create global CSS styles
- Fix linting and formatting issues
- Create basic routing and pages (home, builder, dynamic pages)
- Set up editor skeleton with placeholder for blocks
- Define Block interfaces and types
- Add "Add Block" button (placeholder functionality)
- Write tests for editor page

## Next Steps 🔜
- Implement block-based editing functionality
- Create UI for different block types (Text, Image, Video)
- Add advanced mode for HTML/CSS editing
- Implement mock deployment functionality
- Add chatbot integration
- Add more comprehensive test coverage
- Set up a CI/CD pipeline (GitHub Actions, CircleCI, etc.)
- Configure Husky for pre-commit hooks to run linting and tests
- Add Storybook for component documentation and development
- Implement state management (if needed)
- Set up API routes and backend integration
- Add authentication (if required)
- Implement responsive design
- Optimize for performance
- Add accessibility features

## Future Enhancements 🚀
- Implement internationalization (i18n)
- Add analytics
- Set up error monitoring
- Implement PWA features
- Add SEO optimization
- Create a design system
- Set up automated UI testing with Cypress or Playwright

## Project Structure

# TODO Checklist

## 1. Project Initialization & Configuration ✅

- ✅ Set up a new Next.js TypeScript project
  - ✅ Command: `npx create-next-app --ts selfhosted-builder`
- ✅ Configure ESLint & Prettier
  - ✅ Add `.eslintrc.js` / `.eslintrc.json`
  - ✅ Add `.prettierrc`
  - ✅ Ensure `package.json` has lint scripts
- ✅ Install & Configure Jest + React Testing Library
  - ✅ `jest.config.js` (if needed)
  - ✅ Ensure test scripts are in `package.json`
  - ✅ Add a sample test to verify the testing environment
- ✅ Set up basic GitHub Workflow
  - ✅ CI runs tests and lint on pull requests

## 2. Basic Routing & Pages ✅

- ✅ Create a homepage at `/pages/index.tsx`
  - ✅ Display a basic welcome message
- ✅ Create a "Builder" dashboard at `/pages/builder/index.tsx`
  - ✅ Placeholder text: "Builder Dashboard"
- ✅ Set up a dynamic [slug] page at `/pages/[slug].tsx`
  - ✅ For now, just display the slug in a header
- ✅ Add basic tests to confirm each page renders without errors

## 3. Editor Setup (Skeleton) ✅

- ✅ Create the editor page at `/pages/builder/edit/[slug].tsx`
  - ✅ Display a placeholder list of blocks (initially empty)
  - ✅ Include an "Add Block" button
- ✅ Define a minimal Block interface (or type)
  - ✅ Created interfaces for Block, TextBlock, ImageBlock, VideoBlock, ChatbotBlock
- ✅ Add a test:
  - ✅ Confirms the editor page loads
  - ✅ Checks for the existence of the "Add Block" button

## 4. Block-Based Editing (Basic) 🔜

- Implement block types
  - TextBlock (simple text area)
  - ImageBlock (mock file upload + preview)
  - VideoBlock (mock file upload or video URL field)
- Allow adding blocks via the "Add Block" button
  - Pick block type from a dropdown or modal
  - Store and render blocks in the editor's state
- Preview pages
  - Create `/pages/preview/[slug].tsx` (optional) to see final layout
- Add tests:
  - Verify block creation works
  - Ensure each block type renders properly

## 5. Advanced Mode (HTML/CSS/Tailwind)

- Add an "Advanced Mode" toggle in the editor
  - Button to switch between block-based editor and raw HTML view
- Implement raw HTML editor
  - Could be a `<textarea>` or a code editor library
  - Persist advanced mode content in the same or separate data field
- Add tests:
  - Confirm toggling advanced mode updates the UI
  - Verify data typed in advanced mode is retained

## 6. Simple "Deploy" Button (Mock Deployment)

- Create `deploySite()` function
  - Logs deployment start/success to console
- Add "Deploy" button on `/pages/builder/index.tsx`
  - Wire up the button to call `deploySite()` on click
- Test that:
  - Clicking "Deploy" calls the mock deployment function

## 7. Chatbot Integration (Skeleton)

- Create `<Chatbot />` component in `/components/Chatbot.tsx`
  - Basic UI: input box + "Send" button + response display
- Set up `/api/chatbot.ts` endpoint
  - Returns a dummy response or calls OpenAI if configured
- Add tests:
  - Verify input and button render
  - Mock fetch/axios to confirm the API is called on "Send"

## 8. Multiple Chatbots & Page Awareness

- Allow multiple chatbot blocks
  - Similar to text/image/video blocks
- Pass page content as context to `/api/chatbot.ts`
- Session resets on refresh
  - No persistent storage of conversation
- Tests:
  - Confirm multiple chatbot instances render
  - Check the request body includes page content as context

## 9. Manual Navigation & Basic SEO

- Add manual navigation
  - In `/pages/builder/index.tsx`, let users define a menu: an array of `{ title, link }`
- Site-wide layout (`/components/Layout.tsx`)
  - Displays the navigation menu on all pages
- Basic SEO generation
  - `generateSEOData(content: string)` → `{ title, description }`
  - Could be a mock or use OpenAI
- Set `<head>` data
  - Insert the generated or user-defined SEO data
- Tests:
  - Verify menu data is saved and shown in layout
  - Confirm SEO data is added to `<head>`

## 10. Media Handling & External Embeds

- Enhance ImageBlock & VideoBlock
  - Mock or real file upload logic
  - Use next/image or local file references if possible
- External Embeds
  - Detect external URLs (YouTube, Vimeo, Twitter) and wrap in `<iframe>` or official embed component
- Tests:
  - Ensure images/videos show up
  - Validate embed logic for recognized URLs

## 11. Search

- Create `/pages/search.tsx`
  - Provide an input box for keywords
- Search local pages
  - Simple substring matching on page titles and content
- Display results
  - List matching pages with links
- Test:
  - Verify search queries return the correct pages

## 12. Refinement & Testing

- Add/update unit tests for all components
  - Blocks (Text, Image, Video, Chatbot)
  - Navigation, Layout, Editor
- Integration tests
  - Full flow: create page → add blocks → add chatbots → generate SEO → search → deploy (mock)
- Performance checks
  - Ensure pages and chat responses load quickly
- Cleanup & final instructions
  - Document how to run locally, how to set real OpenAI keys
  - Confirm all tests pass in CI

## 13. Post-MVP Considerations (Future Features)

### Optional / Future Tasks

- Advanced SEO (schema markup, robots.txt, etc.)
- Drafts & Scheduling
- Version History
- Adaptive Learning Chatbots with persistent memory
- Private/Password-Protected Pages
- Performance Optimizations (lazy loading, caching, CDNs)
- Multi-language support
- Backup & Export features
