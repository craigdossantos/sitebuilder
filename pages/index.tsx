import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Self-Hosted Builder</title>
        <meta name="description" content="A self-hosted website builder" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to the Self-Hosted Builder
        </h1>

        <div className={styles.grid} style={{ marginTop: '2rem', textAlign: 'center' }}>
          <h2>Test Navigation Links</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ margin: '1rem 0' }}>
              <Link href="/builder" className={styles.card}>
                Builder Dashboard
              </Link>
            </li>
            <li style={{ margin: '1rem 0' }}>
              <Link href="/builder/edit/test-page" className={styles.card}>
                Edit Test Page
              </Link>
            </li>
            <li style={{ margin: '1rem 0' }}>
              <Link href="/chatbot-demo" className={styles.card}>
                Chatbot Demo
              </Link>
            </li>
            <li style={{ margin: '1rem 0' }}>
              <Link href="/search" className={styles.card}>
                Search Pages
              </Link>
            </li>
            <li style={{ margin: '1rem 0' }}>
              <Link href="/test-page" className={styles.card}>
                View Test Page
              </Link>
            </li>
            <li style={{ margin: '1rem 0' }}>
              <Link href="/example-page" className={styles.card}>
                Example Page
              </Link>
            </li>
          </ul>
          <p style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#666' }}>
            These links are for testing purposes and can be removed later.
          </p>
        </div>
      </main>
    </div>
  );
} 