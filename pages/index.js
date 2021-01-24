import styled from "@emotion/styled"
import Head from "next/head"
import Link from "next/link"
import Layout from "../components/Layout"

export default function Home() {
  return (
    <Layout>
      <h1>Quiz</h1>
      <Link href='/0'>
        <a>Start quiz</a>
      </Link>
    </Layout>
  )
}
