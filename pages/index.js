import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Content from '../components/Content'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>LOTW QSO Viewer</title>
        <meta name="description" content="QSO visualizer for ARRL LOTW" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          QSO Viewer
        </h1>

        <p className={styles.description}>
          Fill out the form below to retrieve and display your QSOs. Pulls data from ARRL&apos;s <a href="https://lotw.arrl.org/">LOTW</a>.
        </p>

        <Content />
      </main>

      <footer className={styles.footer}>
          Powered by NextJS
      </footer>
    </div>
  )
}
