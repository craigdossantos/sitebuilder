# Self-Hosted Website Builder with Chatbot Integration

A Next.js-based website builder that allows you to create and manage pages with a block-based editor and embed AI-powered chatbots.

## Features

- **Block-Based Editor**: Create pages using text, image, video, embed, and chatbot blocks
- **Advanced Mode**: Toggle between block-based editing and raw HTML/CSS with Tailwind support
- **Chatbot Integration**: Embed AI-powered chatbots that are aware of page content
- **SEO Management**: Automatically generate SEO metadata for your pages
- **Search Functionality**: Find pages based on content and titles
- **Simple Deployment**: Deploy your site with a single click

## Getting Started

### Prerequisites

- Node.js 14.x or higher
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/selfhosted-builder.git
   cd selfhosted-builder
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following content:
   ```
   NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Connecting OpenAI API

To use the chatbot functionality, you need an OpenAI API key:

1. Sign up for an account at [OpenAI](https://platform.openai.com/signup)
2. Generate an API key in your account dashboard
3. Add the key to your `.env.local` file as shown above
4. Restart the development server

The chatbot uses the GPT model to generate responses. You can modify the model and parameters in `pages/api/chatbot.ts`.

## Building and Deploying

### Local Build

To build the application locally:

```bash
npm run build
# or
yarn build
```

Then start the production server:

```bash
npm run start
# or
yarn start
```

### Deploying to Vercel

The easiest way to deploy your Next.js app is to use [Vercel](https://vercel.com):

1. Sign up for a Vercel account
2. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```
3. Run the deployment command:
   ```bash
   vercel
   ```
4. Follow the prompts to complete deployment
5. Don't forget to add your OpenAI API key to the environment variables in the Vercel dashboard

### Deploying to Netlify

You can also deploy to [Netlify](https://netlify.com):

1. Sign up for a Netlify account
2. Install the Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```
3. Build your application:
   ```bash
   npm run build
   # or
   yarn build
   ```
4. Deploy to Netlify:
   ```bash
   netlify deploy
   ```
5. Add your OpenAI API key to the environment variables in the Netlify dashboard

## Development

### Project Structure

- `/pages`: Next.js pages and API routes
- `/components`: React components including blocks and chatbot
- `/utils`: Utility functions for SEO and other features
- `/styles`: CSS and styling
- `/__tests__`: Test files

### Running Tests

```bash
# Run all tests
npm test
# or
yarn test

# Run tests in watch mode
npm run test:watch
# or
yarn test:watch
```

## Customization

### Modifying Blocks

You can add or modify block types in `components/types.ts` and create corresponding components in `components/blocks/`.

### Styling

The application uses basic CSS. You can add Tailwind CSS or other styling libraries as needed.

### Advanced Configuration

For advanced configuration, refer to the [Next.js documentation](https://nextjs.org/docs).

## License

This project is licensed under the MIT License - see the LICENSE file for details.
