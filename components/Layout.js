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
          body {
            background: #000;
            overflow: hidden;
            font-family: Rubik, sans-serif;
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
