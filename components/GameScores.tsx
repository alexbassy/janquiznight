import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { RoundState, ScoresState } from '@/lib/scores'
import { IPlayer, players } from '@/lib/questions'
import { keyframes } from '@emotion/react'

export const Wrap = styled(motion.ul)`
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
    height: ${(props) => 20 + props.score * 10}px;
    background: #ddd;
    margin-top: -1rem;
    z-index: -1;
    border-radius: 0 0 8px 8px;
    animation: ${heightTransition} 3s ease;
  }
`

export const Avatar = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 8px;
  border: 3px solid white;
`

export const Amount = styled.span`
  font-size: 1.25rem;
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
