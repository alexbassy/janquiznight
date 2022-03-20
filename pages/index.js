import styled from '@emotion/styled'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout'

const Title = styled.h1`
  font-size: 4rem;
`

const Button = styled.button`
  appearance: none;
  background: white;
  border-radius: 40px;
  padding: 1rem 2rem;
  border: none;
  font-size: 0.85rem;
  font-weight: bold;
  font-family: inherit;
  cursor: pointer;
`

export default function Home() {
  return (
    <Layout>
      <Title>Quiz / 11.11.2021</Title>
      <Link href='/0'>
        <Button>Start</Button>
      </Link>
    </Layout>
  )
}
