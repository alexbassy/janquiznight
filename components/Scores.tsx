import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { RoundState, ScoresState } from '@/lib/scores'
import { IPlayer, players } from '@/lib/questions'

export const Wrap = styled(motion.ul)`
  display: flex;
  position: absolute;
  right: 2rem;
  bottom: 1rem;
  list-style: none;
  z-index: 2;
`

export const Item = styled(motion.li)`
  --size: 2.25rem;

  margin-left: 0.5rem;
  display: flex;
  flex-direction: column;
  text-align: center;
  position: relative;
  cursor: pointer;
  user-select: none;
`

export const Avatar = styled.img`
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  border: 3px solid white;
`

export const Tick = styled.span`
  ::before {
    position: absolute;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: '✔';
    background-color: #26c944;
    border-radius: 50%;
    color: #fff;
    transition: all 0.25s ease;
    opacity: ${(props) => (props.isShown ? 0.7 : 0)};
    transform: ${(props) => (props.isShown ? 'scale(1)' : 'scale(1.5)')};
  }
`

export const Amount = styled.span`
  font-size: 1.25rem;
`

interface IScoresProps {
  round: RoundState
  onSetScores: React.Dispatch<React.SetStateAction<RoundState>>
}

const Scores: React.FC<IScoresProps> = ({ round, onSetScores }) => {
  const onClick = (player: IPlayer) => {
    const score = round[player.name]
    const newScores = {
      ...round,
      [player.name]: score === 1 ? 0 : 1,
    }
    onSetScores(newScores)
  }

  return (
    <Wrap>
      {players.map((player) => {
        const didScore = round[player.name] === 1
        return (
          <Item key={player.id} onClick={() => onClick(player)}>
            <Avatar src={`/players/${player.image}`} />
            <Tick isShown={didScore} />
          </Item>
        )
      })}
    </Wrap>
  )
}

Scores.defaultProps = {
  round: {},
}

export default Scores
