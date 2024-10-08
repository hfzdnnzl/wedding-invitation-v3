import Head from 'next/head'
import '@styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
  <>
  <Head>
    <link rel="icon" href="/logo.ico"></link>
    <link rel="apple-touch-icon" href="/logo_192.png" />
    <link rel="manifest" href="/manifest.json" />
    <link href="https://fonts.googleapis.com/css2?family=Pattaya&family=Quicksand:wght@300..700&family=Noto+Serif:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"></link>
  </Head>
  <Component {...pageProps} />
  </>
  );
}

export default MyApp
