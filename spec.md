# Project Specification: Self-Hosted Website Builder with Embedded Chatbots

## 1. Overview

This project aims to create a self-hosted platform that allows users to publish content easily using a hybrid block-based editor. The platform will support multiple embedded GPT-powered chatbots per page, optimized for interactive learning.

## 2. Core Features & Requirements

### 2.1 Content Management

- **Flat Structure**: Each page is independent.
- **Hybrid Editor**: Drag-and-drop block-based editor with an advanced mode for custom HTML/CSS (Tailwind CSS supported).
- **Manual Navigation**: Users manually add and arrange links between pages.
- **Manual Deployment**: A one-click deploy button updates the site on Vercel/Netlify.
- **Basic SEO**: AI-generated metadata (title, description, Open Graph) with manual override.

### 2.2 Chatbot Integration

- **Multiple Chatbots Per Page**: Users can embed multiple GPT-powered chatbots within different sections.
- **Page-Aware Chatbots**: Bots adjust responses based on the page's content.
- **Guided Chat & Structured Q&A**: Bots can provide pre-written prompts or follow structured learning paths.
- **Embedded Chatbot UI**: Chatbots appear inline within sections of the page.
- **Session-Based Reset**: Conversations reset on page refresh (no persistent history).

### 2.3 Hosting & Deployment

- **Self-Hosted**: Sites will be deployed on Vercel/Netlify.
- **Manual Deployment**: Users trigger updates via a deploy button.
- **Public Pages Only**: No authentication required for viewing pages.
- **Default 404 Error Page**: System-generated "Page Not Found" message.

### 2.4 Media Handling

- **Basic Uploads**: Support for images and videos.
- **External Embeds**: Support for YouTube, Vimeo, Twitter, and iframes.

### 2.5 Search & Navigation

- **Basic Keyword Search**: Looks for exact matches in page titles and content.
- **Smart Internal Link Suggestions**: System suggests relevant internal links for manual approval.
- **Manual Menu Setup**: Users create their own navigation menus.

### 2.6 Styling & Customization

- **Global Styling Only**: Unified design for all pages (no per-page styling overrides yet).
- **Minimalist Chatbot UI**: Clean text-based interaction with no extra branding.
- **Default Favicon & Open Graph Image**: No per-page custom branding yet.

## 3. System Architecture

- **Frontend**: Built using Next.js (React framework) for fast-loading static sites.
- **Backend** (if needed): Lightweight API using Node.js or serverless functions on Vercel for chatbot interactions.
- **Database** (optional, for future features): Firestore or Supabase (if user authentication or persistent chatbot memory is required later).
- **Hosting**: Vercel or Netlify for static site generation and deployment.

## 4. Data Handling

- **No Persistent Storage**: No user data, comments, or chatbot history is stored.
- **AI-Powered SEO**: AI extracts metadata from page content and auto-generates SEO details.
- **Chatbot API Calls**: Requests are made to OpenAI's API for chatbot interactions.

## 5. Error Handling Strategy

- **404 Pages**: Default "Page Not Found" message.
- **Deployment Errors**: Display error logs if a deployment fails.
- **Chatbot Errors**: Fallback response if OpenAI API is unavailable.
- **SEO AI Failures**: If AI metadata generation fails, provide a default placeholder title and description.

## 6. Testing Plan

- **Unit Testing**: Verify individual components (editor, chatbot, search, deploy button).
- **Integration Testing**: Ensure pages render correctly and chatbot API calls work.
- **Performance Testing**: Load test for chatbot responses and page load speeds.
- **SEO Testing**: Validate AI-generated metadata using Lighthouse and Google Search Console.

## 7. Future Feature Additions

The platform is designed to allow for future scalability. Features that can be added later include:

### 7.1 Content & SEO Enhancements

- **Advanced SEO Controls**: Structured schema markup, robots.txt customization.
- **Page Drafts & Scheduled Publishing**: Save pages as drafts before deploying.
- **Full Version History**: Ability to restore past versions of a page.

### 7.2 Chatbot & Interactivity

- **Adaptive Learning Chatbots**: Bots that remember user interactions across sessions.
- **Chatbot-Driven Feedback Collection**: Users provide feedback through chat interactions.
- **Persistent Conversation History**: Users can return to a page and see past bot interactions.

### 7.3 Design & Customization

- **Per-Page Styling Overrides**: Unique styles for different pages.
- **Branded Chatbot UI**: Custom fonts, colors, and styles per bot.
- **Custom Error Pages**: Fully designed 404 pages with chatbot assistance.

### 7.4 User Authentication & Access Control

- **Private & Password-Protected Pages**: Restrict access to certain pages.
- **User Login System**: Allow users to create accounts and save progress.

### 7.5 Advanced Performance & Backend Features

- **Performance Optimizations**: Lazy loading, caching, CDN support.
- **Multi-Language Support**: AI-powered or manual translation options.
- **Full Backup & Export Options**: Export pages as markdown or full HTML/JS.
