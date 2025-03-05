import Head from 'next/head';
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
      </main>
    </div>
  );
} 