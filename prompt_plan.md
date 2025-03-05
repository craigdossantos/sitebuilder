# Self-Hosted Builder with Chatbot Integration

## 1. High-Level Blueprint

### 1.1 Project Initialization & Configuration

- Create a new Next.js project
  - Initialize with TypeScript (for type safety and clarity)
  - Configure environment variables (e.g., OPENAI_API_KEY)
- Establish project structure
  - Organize folders for components, pages, and any serverless functions (if needed)
  - Prepare basic package.json with scripts for development, build, and testing

### 1.2 Content Management

- **Flat Page Structure**
  - Each "page" is a standalone piece of content with its own route
  - Provide a form or editor to create/edit pages
- **Hybrid Block-Based Editor**
  - A minimal drag-and-drop block system
  - Advanced mode toggles a text editor for HTML/CSS (Tailwind supported)
- **Manual Navigation**
  - Add a system for the user to define a menu or links between pages
- **Manual Deployment**
  - A "Deploy" button triggers an API call or script to push changes to Vercel/Netlify

### 1.3 Chatbot Integration

- **Embed Multiple Chatbots**
  - Each page can hold multiple chatbot components
- **Page-Aware Chatbots**
  - Chatbots load relevant context from the page content
  - No persistent history; session resets on refresh
- **Guided Chat & Structured Q&A**
  - Provide optional pre-written prompts
  - Inline UI for chat

### 1.4 Hosting & Deployment

- **Static Export with Next.js**
  - Next.js pages can be exported statically (or via serverless if needed for chatbot calls)
- **Self-Hosted**
  - Deployed on Vercel or Netlify
- **Default 404 Page**
  - Basic "Page Not Found" route

### 1.5 SEO & Metadata

- **AI-Generated SEO**
  - Use OpenAI to derive a title, description, and Open Graph data from content
  - Provide a manual override
- **Keyword Search**
  - Basic search that matches content and titles

### 1.6 Media Handling

- **Image & Video Uploads**
- **External Embeds**
  - YouTube, Vimeo, Twitter, etc.

### 1.7 Testing Strategy

- **Unit Tests**
  - For components and utilities (editor, chatbot)
- **Integration Tests**
  - Verify the flow from page creation to deployment
- **Performance & SEO Testing**
  - Evaluate page load, metadata generation, and search indexing

## 2. First Iteration of Incremental Chunks

**Goal**: Break down the high-level blueprint into logical increments.

1. **Initialize Project Structure**

   - Create Next.js project with TypeScript, ESLint, Prettier
   - Set up minimal GitHub repo

2. **Basic Routing & Pages**

   - Create a minimal homepage
   - Implement static routes for "pages" in the builder

3. **Editor Setup (Skeleton)**

   - Add a placeholder editor page with minimal UI
   - Implement the concept of "blocks" in the code (no drag-and-drop yet)

4. **Block-Based Editing (Basic)**

   - Allow user to add text, image, and video blocks
   - Store and render them on a preview page

5. **Advanced Mode for HTML/CSS**

   - Toggle between block-based view and raw HTML/CSS/Tailwind

6. **Simple "Deploy" Button**

   - Fake the deployment call (log to console or run a mock function)

7. **Chatbot Integration (Skeleton)**

   - Create a Chatbot component that calls OpenAI's API with minimal prompt handling
   - Include the component on a single test page

8. **Multiple Chatbots & Page Awareness**

   - Allow adding multiple chatbot components on a page
   - Pass the page content as additional context

9. **Manual Navigation & Basic SEO**

   - User sets up internal links
   - AI-generated metadata for pages

10. **Media Handling & External Embeds**

    - Support for image, video uploads, iframes, and basic embed links

11. **Search**

    - Implement basic text search across pages

12. **Refinement & Testing**
    - Clean up, add unit tests, integration tests
    - Work on code coverage

## 3. Second Iteration: Breaking Chunks into Actionable Steps

We now refine each chunk into smaller tasks that can be implemented with test-driven development.

### 3.1 Initialize Project Structure

- **Create Next.js App with TypeScript**
  - `npx create-next-app --ts selfhosted-builder`
- **Configure ESLint & Prettier**
  - Add config files, set up consistent coding styles
- **Set Up Testing Framework**
  - Choose Jest & React Testing Library
  - Add jest.config.js, babel.config.js (if needed)
- **Add Basic GitHub Workflow**
  - For CI (tests, linting)

### 3.2 Basic Routing & Pages

- **Home Page**
  - Minimal layout
- **Builder Page**
  - Route at /builder to manage content
- **Dynamic Pages**
  - [slug].tsx that loads content from local data

### 3.3 Editor Setup (Skeleton)

- **Editor Page**
  - Create /builder/edit/[slug].tsx
  - Display a list of blocks (initially empty)
- **Minimal UI**
  - "Add Block" button
  - Render each block as a placeholder <div>

### 3.4 Block-Based Editing (Basic)

- **Text Block**
  - A block that edits text
- **Image Block**
  - A block that displays an uploaded image (mock upload)
- **Video Block**
  - A block that displays an uploaded video (mock upload)
- **Preview**
  - /pages/preview/[slug].tsx to see the final layout

### 3.5 Advanced Mode for HTML/CSS

- **Toggle Button**
  - Switch between block-based editor and raw HTML editor
- **Raw HTML Editor**
  - Use a simple code editor library or a textarea for input

### 3.6 Simple "Deploy" Button

- **Deploy Page**
  - A button that calls a mock deploy function
- **Fake Deployment**
  - Log success/failure to console

### 3.7 Chatbot Integration (Skeleton)

- **Chatbot Component**
  - Minimal <Chatbot /> that calls OpenAI via a simple API endpoint
- **API Endpoint**
  - /api/chatbot.ts that handles the request
- **Basic Prompt Handling**
  - Hard-coded system prompt, user prompt from input field

### 3.8 Multiple Chatbots & Page Awareness

- **Add Chatbots to Page**
  - Insert multiple <Chatbot /> components
- **Context**
  - Pass page content as part of the prompt
- **Session Reset**
  - Clear conversation on page refresh

### 3.9 Manual Navigation & Basic SEO

- **Manual Navigation**
  - User sets up a navigation menu: array of { title, link }
- **AI-Generated Metadata**
  - Simple function that calls OpenAI to get title, description
  - Fallback to user-defined or default

### 3.10 Media Handling & External Embeds

- **File Upload**
  - Store in local state or mock cloud storage
- **Embeds**
  - Recognize external links and generate iframes for YouTube, Vimeo, etc.

### 3.11 Search

- **Search Page**
  - Input to search across local pages
- **Search Algorithm**
  - Basic substring matching on titles/content

### 3.12 Refinement & Testing

- **Unit Tests**
  - For editor, blocks, chatbot
- **Integration Tests**
  - Ensure editor -> save -> preview -> deploy cycle works
- **Performance Checks**
  - Minimal checks on chat responses
- **CI Pipeline**
  - Confirm all tests pass on push

## 4. Final Iteration: Right-Sized Prompts for Code Generation

Here is a series of test-driven prompts that you can use with a code-generation LLM. Each prompt builds on the previous, ensuring no orphaned or hanging code.

> **Important**: When you run each prompt, make sure you have the previous code already integrated into your codebase so that every piece fits together.

### Prompt 1: Project Initialization

We are creating a Next.js project with TypeScript, ESLint, Prettier, and Jest for testing. Please perform the following tasks:

1. Initialize a new Next.js TypeScript project in a folder named "selfhosted-builder".
2. Configure ESLint and Prettier in the project with recommended settings.
3. Install and configure Jest and React Testing Library for unit testing. Include any necessary configuration files like `jest.config.js`.
4. Provide all new or modified files.
5. Include minimal documentation on how to run `npm run dev` and the test suite.

Ensure that after this step, we have:

- A functional Next.js app.
- Proper linting with ESLint + Prettier.
- A working Jest setup that can run tests.

Let's do this in a test-driven approach: if possible, include a simple example test to verify the testing environment is working.

### Prompt 2: Basic Routing & Pages

We have our Next.js + TypeScript project set up. Now we need basic routing:

1. Create a homepage at `/pages/index.tsx` with a simple "Welcome to the Self-Hosted Builder" message.
2. Create a "Builder" page at `/pages/builder/index.tsx` that displays "Builder Dashboard".
3. For dynamic content pages, create `/pages/[slug].tsx`. For now, just display the slug in a header.
4. Write unit tests to ensure each page renders correctly.

Please provide:

- Any new or modified files (`index.tsx`, `builder/index.tsx`, `[slug].tsx`).
- Test files demonstrating TDD (e.g., `__tests__/index.test.tsx`) to confirm pages render.

We want to ensure:

- Pages compile without errors.
- Tests pass successfully.

### Prompt 3: Editor Setup (Skeleton)

Now let's build the skeleton of our block-based editor. We want a page at `/pages/builder/edit/[slug].tsx` that:

1. Renders a minimal UI with a placeholder for a list of blocks (initially empty).
2. Provides a button or link "Add Block" that doesn't do anything yet.
3. Write a test to confirm the editor page loads and has the "Add Block" button.

Tasks:

- Create or modify `/pages/builder/edit/[slug].tsx`.
- Add a basic test in `__tests__/builder/edit/[slug].test.tsx`.

Include any TypeScript interfaces or placeholder data structures needed for the blocks (like an empty `Block` type).

### Prompt 4: Block-Based Editing (Basic)

Next, let's enable actual block-based editing:

1. Implement three block types: TextBlock, ImageBlock, VideoBlock.
2. Each block has a placeholder UI for editing. For instance:
   - TextBlock: a simple `<textarea>` or `<input>`.
   - ImageBlock: a mock `<input type="file">` plus a preview.
   - VideoBlock: a mock `<input type="file">` or a text field for a video URL.
3. The "Add Block" button should let us choose which type of block to add. Store them in local state.
4. Render each block in the editor page.
5. Write tests that:
   - Check if we can add a TextBlock.
   - Verify the internal state holds the blocks.
   - Confirm each block type renders properly.

Provide updated or new files, with all tests passing.

### Prompt 5: Advanced Mode (HTML/CSS/Tailwind)

We want a toggle between block-based editing and a raw HTML/CSS mode:

1. Add a "Switch to Advanced Mode" button.
2. When in advanced mode, hide the block-based editor and show a raw text editor (e.g., a `<textarea>`) to edit raw HTML/CSS.
3. Allow the user to type Tailwind classes. For now, no validation needed—just store the text.
4. Write tests to verify:
   - Toggling advanced mode is reflected in the UI.
   - Data typed in advanced mode persists when toggling back, if desired.

Implement these changes in `/pages/builder/edit/[slug].tsx` and share updated tests.

### Prompt 6: Simple "Deploy" Button (Mock Deployment)

We need a "Deploy" button that triggers a mock deployment:

1. Create a simple function `deploySite()` that logs "Deployment started…" and "Deployment successful!" in the console.
2. Place a "Deploy" button on the Builder Dashboard (`/pages/builder/index.tsx`).
3. On click, call `deploySite()`.
4. Write a test that checks if the function is called when the button is clicked.

Update or create any necessary files, ensuring tests pass.

### Prompt 7: Chatbot Integration (Skeleton)

We want to embed an OpenAI-powered chatbot:

1. Create a reusable `<Chatbot />` component in `/components/Chatbot.tsx`.
2. Add a basic `/api/chatbot.ts` endpoint that accepts a user message and returns a dummy response (e.g., "Hello from the chatbot!" or an OpenAI completion if you prefer).
3. The `<Chatbot />` component should display a simple input box and a "Send" button, and show the response below.
4. Write tests:
   - Confirm the input and button appear.
   - Verify that clicking "Send" calls the API endpoint (mock the fetch or axios call).

We want minimal styling, no persistent history, just enough to prove the skeleton works.

### Prompt 8: Multiple Chatbots & Page Awareness

Now let's allow multiple chatbots per page and make them aware of the page content:

1. In the editor, let the user add multiple chatbot blocks (similar to text/image/video).
2. Pass the page content as a context parameter to the `/api/chatbot.ts` endpoint. For now, just attach it to the request body.
3. Each chatbot instance should have its own input and response area.
4. On page refresh, the chatbot conversation resets (ensure no persistent storage).
5. Write tests:
   - Confirm multiple chatbot blocks render.
   - Verify the request includes the page content as context.

Please provide updated or new files and test coverage for these features.

### Prompt 9: Manual Navigation & Basic SEO

Add navigation and basic SEO:

1. Implement a navigation editor in `/pages/builder/index.tsx` where the user can manually create a menu: an array of { title: string; link }.
2. Display this menu in a site-wide layout component (`/components/Layout.tsx`) so that all pages show the menu.
3. Add a function `generateSEOData(content: string)` that returns `{ title: string, description: string }`. This can be a mock or call OpenAI if you prefer.
4. Display the SEO data in the `<head>` of each page.
5. Tests:
   - Navigation data can be added and appears in the layout.
   - SEO data function returns a mock result and is inserted into `<head>`.

Ensure all tests pass and the integration is smooth.

### Prompt 10: Media Handling & External Embeds

We want media handling enhancements:

1. For ImageBlock and VideoBlock, implement a real or mock file upload process. If real, use something like `next/image` or a third-party service, but local mock is fine for now.
2. Detect external URLs in a text block or a special "EmbedBlock" to generate `<iframe>` for YouTube, Vimeo, or Twitter.
3. Tests:
   - Confirm image/video upload works or is at least simulated.
   - Check if recognized URLs are embedded properly.

Provide updated or new files, ensuring no regression on previous tests.

### Prompt 11: Search

Now let's implement a basic search feature:

1. Create a `/pages/search.tsx` with an input box for keywords.
2. Query local page data (title and content) for substring matches.
3. Display a list of matching pages with links.
4. Tests:
   - Ensure the search page appears.
   - Confirm a sample query returns expected results.

Share updated or new files, ensuring tests pass.

### Prompt 12: Refinement, Testing, and Integration

Finally, let's refine everything and ensure a cohesive platform:

1. Add or update unit tests to cover all blocks, the deployment flow, chatbot integration, etc.
2. Create integration tests to walk through:
   - Creating a page with blocks.
   - Adding chatbot blocks.
   - Checking basic SEO is generated.
   - Searching for that page.
   - Clicking "Deploy" (mock).
3. Improve any performance issues or code clarity if needed.
4. Provide final instructions on how to run and deploy the platform locally, plus how to connect a real OpenAI API key.

We want a final polished codebase. Please provide any final changes and confirm that all tests pass.

Conclusion
This plan ensures incremental and test-driven development:

Each step builds on top of the previous one.
No big jumps in complexity.
Testing is integrated at every stage, guaranteeing reliability.
By the end, you have a working MVP that meets the core requirements of a self-hosted website builder with embedded GPT-powered chatbots.
Use these prompts sequentially with your code-generation LLM. After each prompt's code is generated, integrate it into your repository, run the tests, and confirm everything works before moving on.
