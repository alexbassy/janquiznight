import styled from '@emotion/styled'
import Head from 'next/head'
import Link from 'next/link'
import { Global, css } from '@emotion/react'
import Layout from '../components/Layout'
import CreatorLayout from '../components/CreatorLayout'
import questions from '../lib/questions'

const List = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0;
  max-width: 100%;
  padding: 1.5rem;
`

const Item = styled.li`
  width: 100%;
  aspect-ratio: 4 / 3;
  background: rgb(120 120 120);
  margin-bottom: 1.5rem;
`

export default function Creator() {
  return (
    <CreatorLayout
      title='Creator'
      sidebar={
        <List>
          {questions.map((question) => {
            return <Item key={question.id}></Item>
          })}
        </List>
      }
    >
      Main content
    </CreatorLayout>
  )
}
