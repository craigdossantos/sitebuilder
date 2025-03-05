import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function DynamicPage() {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div className={styles.container}>
      <Head>
        <title>{slug} | Self-Hosted Builder</title>
        <meta name="description" content={`${slug} page`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          {slug}
        </h1>
      </main>
    </div>
  );
} 