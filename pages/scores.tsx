import GameScores from '@/components/GameScores'
import { getScoresFromCache } from '@/lib/scores'
import styled from '@emotion/styled'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Layout from '../components/Layout'

export default function Scores() {
  const [totalScores, setTotalScores] = useState({})

  useEffect(() => {
    const scores = getScoresFromCache()

    const totalScores = Object.values(scores).reduce((accum, round) => {
      Object.entries(round).forEach(([player, score]) => {
        if (!accum[player]) {
          accum[player] = 0
        }

        accum[player] += score
      })

      return accum
    }, {})

    setTotalScores(totalScores)
  }, [])

  return (
    <Layout>
      <h1>Scores</h1>
      <GameScores totalScores={totalScores} />
    </Layout>
  )
}
