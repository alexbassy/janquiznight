import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { IPlayer, players } from '../lib/questions'

export interface IScores {
  [name: string]: number
}

export interface IScoresState {
  [id: string]: IScores
}

export const Wrap = styled(motion.ul)`
  display: flex;
  position: absolute;
  right: 2rem;
  bottom: 1rem;
  list-style: none;
`

export const Item = styled(motion.li)`
  margin-left: 0.5rem;
  display: flex;
  flex-direction: column;
  text-align: center;
`

export const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 3px solid white;
`

export const Amount = styled.span`
  font-size: 1.25rem;
`

interface IScoresProps {
  questionId: string
  scores: IScoresSate
  onSetScores: (questionId: string, newScores: IScores) => void
}

const Scores: React.FC<IScoresProps> = ({
  questionId,
  scores,
  onSetScores,
}) => {
  const onClick = (player: IPlayer) => {
    const score = scores[player.name] || 0
    const newScores = {
      ...scores,
      [player.name]: score === 0 ? 1 : 0,
    }
    onSetScores(questionId, newScores)
  }

  return (
    <Wrap>
      {players.map((player) => {
        return (
          <Item key={player.id}>
            <Amount>
              {Object.values(scores).reduce((accum, score) => {
                return accum + (score[player.name] || 0)
              }, 0)}
            </Amount>
            <Avatar
              src={`/players/${player.image}`}
              onClick={() => onClick(player)}
            />
          </Item>
        )
      })}
    </Wrap>
  )
}

export default Scores
