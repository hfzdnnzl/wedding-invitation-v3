import Head from 'next/head'
import '@app/globals.css'

function MyApp({ Component, pageProps }) {
  return (
  <>
  <Head>
    <link rel="icon" href="/logo.ico"></link>
    <link rel="apple-touch-icon" href="/logo_192.png" />
    <link rel="manifest" href="/manifest.json" />
  </Head>
  <Component {...pageProps} />
  </>
  );
}

export default MyApp
