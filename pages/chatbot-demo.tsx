import Head from 'next/head';
import Chatbot from '../components/Chatbot';

export default function ChatbotDemo() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>Chatbot Demo | Self-Hosted Builder</title>
        <meta name="description" content="Demo of the chatbot component" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-3xl font-bold mb-8 text-center">Chatbot Demo</h1>
        
        <div className="max-w-lg mx-auto">
          <Chatbot placeholder="Ask the chatbot something..." />
        </div>
        
        <div className="mt-8 max-w-lg mx-auto p-4 bg-gray-100 rounded">
          <h2 className="text-xl font-semibold mb-2">Try these messages:</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Hello</li>
            <li>I need help</li>
            <li>Goodbye</li>
            <li>Any other message</li>
          </ul>
        </div>
      </main>
    </div>
  );
} 