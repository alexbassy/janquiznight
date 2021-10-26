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
      <Head>
        <title>{props.title || 'Quiz'}</title>
      </Head>
      {props.children}
    </Container>
  )
}
