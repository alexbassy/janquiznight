import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { RoundState, ScoresState } from '@/lib/scores'
import { IPlayer, players } from '@/lib/questions'
import { keyframes } from '@emotion/react'

export const Wrap = styled(motion.ul)`
  --radius: 100px;

  display: flex;
  list-style: none;
  align-items: flex-end;
  min-height: 15rem;
`

const heightTransition = keyframes`
  from {
    max-height:0;
  }
  100% {
    max-height: 15rem;
  }
`

export const Item = styled(motion.li)`
  margin-left: 0.5rem;
  display: flex;
  flex-direction: column;
  text-align: center;

  ::after {
    content: '';
    height: ${(props) => 20 + props.score * 15}px;
    background: rgb(255 255 255 / 0.15);
    margin-top: -2.5rem;
    z-index: -1;
    border-radius: 0 0 var(--radius) var(--radius);
    animation: ${heightTransition} 3s ease;
  }
`

export const Avatar = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: var(--radius);
  border: 3px solid white;
`

export const Amount = styled.span`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
`

interface IScoresProps {
  totalScores: ScoresState
}

const Scores: React.FC<IScoresProps> = ({ totalScores }) => {
  return (
    <Wrap>
      {players.map((player) => {
        const playerScore = totalScores[player.name]
        return (
          <Item key={player.id} score={playerScore}>
            <Amount>{playerScore || 0}</Amount>
            <Avatar src={`/players/${player.image}`} />
          </Item>
        )
      })}
    </Wrap>
  )
}

Scores.defaultProps = {
  totalScores: {},
}

export default Scores
