import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout'

export default function Home() {
  return (
    <Layout>
      <h1>Quiz</h1>
      <Link href='/0' passHref>
        <button>Start quiz</button>
      </Link>
    </Layout>
  )
}
