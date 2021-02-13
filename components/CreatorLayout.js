import styled from '@emotion/styled'
import Head from 'next/head'
import Link from 'next/link'
import { Global, css } from '@emotion/react'
import Layout from '../components/Layout'
import questions from '../lib/questions'

const Container = styled.div`
  display: flex;
  flex: 1 1 100%;
  flex-direction: column;
  width: 100%;
  height: 100%;
`
const Header = styled.header`
  display: flex;
  height: 4rem;
  border-bottom: 3px solid #333;
  padding: 1.2rem 1.5rem;
`
const Title = styled.h1`
  font-weight: normal;
  font-size: 1.5rem;
  margin: 0;
`
const Page = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
`
const Sidebar = styled.aside`
  flex: 1;
  background: rgb(20 20 20);
  overflow: auto;
`

const Main = styled.main`
  flex: 4;
`

export default function CreatorLayout(props) {
  return (
    <Layout>
      <Head>
        <title>{props.title}</title>
      </Head>
      <Container>
        <Header>
          <Title>{props.title}</Title>
        </Header>
        <Page>
          <Sidebar>{props.sidebar}</Sidebar>
          <Main>{props.children}</Main>
        </Page>
      </Container>
    </Layout>
  )
}
