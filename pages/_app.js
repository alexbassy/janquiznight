import { Global, css } from '@emotion/react'
import Head from 'next/head'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Global
        styles={css`
          html {
            font-size: 16px;
          }
          body {
            background: #000;
            overflow: hidden;
            font-family: Inter, sans-serif;
          }
          @media screen and (min-width: 320px) {
            html {
              font-size: calc(16px + 6 * ((100vw - 320px) / 680));
            }
          }
          @media screen and (min-width: 1000px) {
            html {
              font-size: 22px;
            }
          }
        `}
      />
      <Head>
        <link rel='icon' href='/favicon.ico' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin />
        <link
          href='https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap'
          rel='stylesheet'
        />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
