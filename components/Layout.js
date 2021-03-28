import { Global, css } from '@emotion/react'
import styled from '@emotion/styled'
import Head from 'next/head'

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
`

export default function Layout(props) {
  return (
    <Container>
      <Global
        styles={css`
          html {
            font-size: 16px;
          }
          body {
            background: #000;
            overflow: hidden;
            font-family: Rubik, sans-serif;
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
        <title>{props.title || 'Quiz'}</title>
        <link rel='icon' href='/favicon.ico' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&display=swap'
          rel='stylesheet'
        />
      </Head>
      {props.children}
    </Container>
  )
}
